// These assert curriculum contracts, not prose quality or browser geometry.
// Literal milestones are intentional: consistency alone cannot prove a course
// still teaches the sequence promised to students.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

interface Node {
  id: string;
  type: string;
  related: string[];
  meta: Record<string, any>;
}
const api = JSON.parse(readFileSync("dist/api/index.json", "utf8"));
const nodes = api.nodes as Node[];
const workshops = nodes.filter(n => n.type === "sessions").sort((a, b) => a.meta.week - b.meta.week);

describe("the dating field guide students are promised", () => {
  it("builds twelve distinct pieces in the promised order", () => {
    expect(workshops.map(n => n.meta.output)).toEqual([
      "Intentions map", "Boundary statements", "Meeting-place map",
      "Introduction card", "Conversation transcript", "Invitation branches",
      "First-date plan", "Uncertainty decision tree", "Compatibility questions",
      "Repair dialogue", "Relationship conversation", "Dating field guide",
    ]);
  });

  it("pairs each workshop with a lecture and explicitly builds on earlier work", () => {
    for (const workshop of workshops) {
      const week = workshop.meta.week as number;
      expect(workshop.related).toContain(`lectures/week-${String(week).padStart(2, "0")}`);
      if (week > 1) {
        expect(workshop.meta.buildsOn?.length, workshop.id).toBeGreaterThan(0);
        for (const ref of workshop.meta.buildsOn) {
          const earlier = nodes.find(n => n.id === ref);
          expect(earlier, ref).toBeDefined();
          expect(earlier!.meta.week).toBeLessThan(week);
          expect(workshop.related).toContain(ref);
        }
      }
    }
  });

  it("keeps three assessed milestones with preparation before each deadline", () => {
    const assessments = nodes.filter(n => n.type === "assessments").sort((a, b) => a.meta.week - b.meta.week);
    expect(assessments.map(n => [n.id, n.meta.week, n.meta.weight])).toEqual([
      ["assessments/intentions-map", 3, 20],
      ["assessments/first-date-plan", 7, 30],
      ["assessments/field-guide", 12, 50],
    ]);
    for (const assessment of assessments) {
      expect(assessment.meta.practiceMode).toBe("fictional-case");
      expect(assessment.meta.preparation.length).toBeGreaterThan(0);
      for (const ref of assessment.meta.preparation) {
        const workshop = nodes.find(n => n.id === ref)!;
        expect(workshop, ref).toBeDefined();
        expect(String(workshop.meta.date).slice(0, 10) <= String(assessment.meta.due).slice(0, 10)).toBe(true);
        expect(assessment.related).toContain(ref);
      }
    }
  });

  it("keeps weekly lectures on Mondays and workshops on Thursdays, across the break", () => {
    expect(workshops.map(n => String(n.meta.date).slice(0, 10))).toEqual([
      "2027-02-25", "2027-03-04", "2027-03-11", "2027-03-18",
      "2027-03-25", "2027-04-01", "2027-04-22", "2027-04-29",
      "2027-05-06", "2027-05-13", "2027-05-20", "2027-05-27",
    ]);
    for (const workshop of workshops) {
      const lecture = nodes.find(n => n.type === "lectures" && n.meta.week === workshop.meta.week)!;
      expect(lecture).toBeDefined();
      expect(Date.parse(String(workshop.meta.date)) - Date.parse(String(lecture.meta.date))).toBe(3 * 86400000);
    }
  });
});
