---
title: "Interaction Protocols: The Initial Message"
description: "Classify opening messages with a decision tree. Compare context and cost, and expose why forcing a reply is a broken optimisation target."
week: 6
date: 2027-03-29
teachers: [mira-chen]
keyConcept: "Bypassing the conversational firewall"
related: [sessions/06-message-tree]
---

## After the match: a protocol with another operator

Classify opening messages using a decision tree, not a list of magic strings. Begin with the fictional case: is there a shared topic, a supported detail and a question someone can answer without doing your homework?

“Hey” has low composition cost and little context. Niche humour can supply a useful hook or require a shared reference the recipient does not have. In a **constructed fixture**, “hey” receives 2 replies/10 exposures and a board-game opener receives 4/10. Both samples are tiny; these are invented counts, not real failure rates or proof that humour works.

## A tree with an exit

Use these branches:

1. An explicit refusal or block already exists: stop.
2. A supported shared topic exists: ask one specific, optional question.
3. No shared topic is known: use a plain introduction without inventing common ground.
4. A reply arrives: respond to its content. No reply arrives: record “pending,” not a guessed motive.

For Alex: “You mentioned board games. Co-op or competitive? No pressure to reply.” Record the case fact supporting the reference. If the supplied recipient case does not mention games, that branch is unavailable.

## Key concept: the conversational firewall

“Bypassing the conversational firewall” means removing avoidable ambiguity, not bypassing a person's boundary. The request to format a message that **forces a response** is a deliberately broken objective: pressure can generate replies while degrading the interaction the metric was supposed to represent.

In the lab, compare two openers under a declared reply probability and composition cost, then stress-test the decision tree with a refusal and missing information. Do not treat silence as a failed person. Your output becomes next week's asynchronous state machine, where “stop” must remain reachable even when the optimiser dislikes it.

[Continue to the week 6 tutorial](/sessions/06-message-tree/).
