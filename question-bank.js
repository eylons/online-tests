"use strict";

window.QUESTION_BANK = [
  {
    id: "search-formulation",
    topic: "Search",
    question: "Which set of components describes the standard search problem formulation on the crib sheet?",
    choices: [
      "States, initial state, goals, actions, transition model, and path cost",
      "Variables, domains, constraints, and a fitness function",
      "A board, two players, and a terminal utility only",
      "A heuristic, a frontier, and a visited set"
    ],
    answer: "States, initial state, goals, actions, transition model, and path cost",
    explanation: "The formulation specifies S, the initial state, goal set G, actions A, transition T(s,a)→s′, and path cost C."
  },
  {
    id: "node-contents",
    topic: "Search",
    question: "Besides the state, which information is listed as part of a search node?",
    choices: ["Parent pointer, action, path cost g, and depth", "Heuristic h, domain, and constraint graph", "Player utility and legal moves only", "Temperature and evaluation score"],
    answer: "Parent pointer, action, path cost g, and depth",
    explanation: "A node records the state and enough search-path information to reconstruct a solution: parent pointer, action, g, and depth."
  },
  {
    id: "frontier-orders",
    topic: "Search",
    question: "Which frontier order is used by uniform-cost search (UCS)?",
    choices: ["FIFO queue", "LIFO stack", "Smallest path cost g first", "Smallest heuristic h first"],
    answer: "Smallest path cost g first",
    explanation: "UCS pops the frontier node with minimum accumulated path cost g. BFS uses FIFO, DFS uses LIFO, and greedy search prioritizes h."
  },
  {
    id: "bfs-ucs",
    topic: "Search",
    question: "When is breadth-first search equivalent to uniform-cost search?",
    choices: ["When all edge costs are equal to one", "When the heuristic is admissible", "When the graph is a tree", "When all goals are at the same depth"],
    answer: "When all edge costs are equal to one",
    explanation: "With unit edge costs, minimizing path cost is the same as minimizing the number of edges, so BFS is UCS with unit costs."
  },
  {
    id: "ucs-complete",
    topic: "Search",
    question: "What condition guarantees UCS completeness according to the crib sheet?",
    choices: ["Every step cost is at least some ε > 0", "The branching factor is exactly two", "All heuristics are consistent", "The goal test happens when a node is generated"],
    answer: "Every step cost is at least some ε > 0",
    explanation: "UCS is complete if every step cost is bounded below by a positive ε, preventing infinitely many increasingly cheap steps before a goal."
  },
  {
    id: "negative-edges",
    topic: "Search",
    question: "Why does adding a constant to every edge cost not fix negative-edge problems for UCS or A*?",
    choices: [
      "It penalizes paths with more edges, which can change their relative costs",
      "It makes every heuristic inadmissible",
      "It removes all cycles from the graph",
      "It turns the frontier into a LIFO stack"
    ],
    answer: "It penalizes paths with more edges, which can change their relative costs",
    explanation: "Adding a constant once per edge changes a path's cost in proportion to its length, so paths with different numbers of edges can be reordered."
  },
  {
    id: "ids-rework",
    topic: "Search",
    question: "Why is the repeated work in iterative deepening search usually acceptable?",
    choices: [
      "Most nodes are at the deepest level, so shallower levels are revisited relatively few times",
      "It stores every generated node in memory",
      "It uses the heuristic to avoid shallow states",
      "It expands each node only once"
    ],
    answer: "Most nodes are at the deepest level, so shallower levels are revisited relatively few times",
    explanation: "For branching factor b and shallowest goal depth d, the repeated work is O(b^d); the deepest level dominates the total."
  },
  {
    id: "a-star-score",
    topic: "A* and heuristics",
    question: "What priority score does A* use to order frontier nodes?",
    choices: ["f = h", "f = g", "f = g + h", "f = g − h"],
    answer: "f = g + h",
    explanation: "A* combines cost already paid g with estimated remaining cost h."
  },
  {
    id: "admissible",
    topic: "A* and heuristics",
    question: "A heuristic h is admissible when it:",
    choices: [
      "Never overestimates the true remaining cost h*",
      "Is always greater than the true remaining cost",
      "Is zero at every non-goal state",
      "Decreases along every edge"
    ],
    answer: "Never overestimates the true remaining cost h*",
    explanation: "Admissibility means h(n) ≤ h*(n) for every node. This is the key condition in the crib sheet for A* optimality."
  },
  {
    id: "consistent",
    topic: "A* and heuristics",
    question: "Which condition defines a consistent heuristic?",
    choices: [
      "h(n) ≤ c(n,n′) + h(n′) for every edge",
      "h(n) ≥ h*(n) for every node",
      "h(n) = g(n) for every node",
      "h(n) is the same for all nodes at one depth"
    ],
    answer: "h(n) ≤ c(n,n′) + h(n′) for every edge",
    explanation: "Consistency is the triangle-inequality condition. It implies that f-values do not decrease along a path and is stronger than admissibility."
  },
  {
    id: "heuristic-dominance",
    topic: "A* and heuristics",
    question: "If two heuristics are admissible and h₂(n) ≥ h₁(n) for every node, what can be concluded?",
    choices: [
      "h₂ dominates h₁ and A* with h₂ expands no more nodes",
      "h₁ dominates h₂ because it is smaller",
      "Neither heuristic can be used by A*",
      "A* with h₂ is no longer optimal"
    ],
    answer: "h₂ dominates h₁ and A* with h₂ expands no more nodes",
    explanation: "Among admissible heuristics, the one with higher estimates everywhere dominates: it is more informed while retaining A* optimality."
  },
  {
    id: "zero-heuristic",
    topic: "A* and heuristics",
    question: "What does A* become when h is zero everywhere?",
    choices: ["Depth-first search", "Greedy best-first search", "Uniform-cost search", "Iterative deepening"],
    answer: "Uniform-cost search",
    explanation: "With h ≡ 0, A* orders nodes only by g, exactly the UCS priority."
  },
  {
    id: "greedy-not-optimal",
    topic: "A* and heuristics",
    question: "Why can greedy best-first search be suboptimal even if its heuristic is perfect?",
    choices: [
      "It ignores the path cost already paid g",
      "It always expands the most expensive path first",
      "A perfect heuristic is necessarily inadmissible",
      "It cannot use a priority queue"
    ],
    answer: "It ignores the path cost already paid g",
    explanation: "Greedy search prioritizes h alone. A route that looks close to the goal can already have accumulated a much larger cost."
  },
  {
    id: "hill-climbing",
    topic: "Local search",
    question: "Which is a known limitation of hill climbing?",
    choices: ["It can get stuck at a local maximum or plateau", "It requires storing the entire search tree", "It cannot evaluate neighboring states", "It is guaranteed to find a global maximum"],
    answer: "It can get stuck at a local maximum or plateau",
    explanation: "Hill climbing moves to a better neighbor but has no memory; it can stop at a local maximum, plateau, or shoulder."
  },
  {
    id: "annealing-probability",
    topic: "Local search",
    question: "Simulated annealing has current evaluation E = 10, candidate Eᵢ = 7, and T = 2. What is the probability of accepting this worse move?",
    choices: ["About 0.22", "About 0.50", "About 0.78", "Exactly 1"],
    answer: "About 0.22",
    explanation: "For a worse move, p = e⁻(E−Eᵢ)/T = e⁻³/² ≈ 0.22."
  },
  {
    id: "annealing-temperature",
    topic: "Local search",
    question: "What happens to simulated annealing as temperature T approaches zero?",
    choices: ["It behaves increasingly like hill climbing", "It accepts every worse move", "It becomes breadth-first search", "It increases its population size"],
    answer: "It behaves increasingly like hill climbing",
    explanation: "At high temperature, worse moves are more likely to be accepted. As T → 0, the acceptance probability for worse moves approaches zero."
  },
  {
    id: "local-beam",
    topic: "Local search",
    question: "How does local beam search differ from running k independent random restarts?",
    choices: [
      "It keeps the best k neighbors from the combined pool, allowing the states to share information",
      "It stores only one state and never compares neighbors",
      "It guarantees a global optimum after k steps",
      "It uses a population with crossover and mutation"
    ],
    answer: "It keeps the best k neighbors from the combined pool, allowing the states to share information",
    explanation: "Local beam search pools neighbors from all k current states and retains the best k. With k = 1 it reduces to hill climbing."
  },
  {
    id: "genetic-crossover",
    topic: "Local search",
    question: "In a genetic algorithm, what does crossover do?",
    choices: ["Combines parts of two parent encodings to create offspring", "Accepts a worse move according to temperature", "Removes unsupported domain values", "Prunes a game-tree branch"],
    answer: "Combines parts of two parent encodings to create offspring",
    explanation: "Crossover combines parent representations; mutation changes parts such as flipping bits. The method is sensitive to encoding and parameter choices."
  },
  {
    id: "csp-definition",
    topic: "Constraint satisfaction",
    question: "A CSP is made up of:",
    choices: ["Variables, domains, and constraints", "States, paths, and heuristics", "Players, turns, and utilities", "Individuals, fitness, and mutation"],
    answer: "Variables, domains, and constraints",
    explanation: "A constraint satisfaction problem defines variables, each variable's domain, and constraints over assignments."
  },
  {
    id: "csp-solution",
    topic: "Constraint satisfaction",
    question: "What makes an assignment a CSP solution?",
    choices: ["It is complete and satisfies every constraint", "It assigns at least one variable", "It has the minimum path cost", "It reaches a terminal game state"],
    answer: "It is complete and satisfies every constraint",
    explanation: "A solution is a complete assignment of values to variables that is consistent with all constraints."
  },
  {
    id: "arc-consistency",
    topic: "Constraint satisfaction",
    question: "For an arc X → Y to be consistent, what must be true for each value x in D(X)?",
    choices: [
      "There is some y in D(Y) that satisfies the constraint C(X,Y)",
      "Every y in D(Y) satisfies the constraint",
      "X and Y have identical domains",
      "X has only one legal value"
    ],
    answer: "There is some y in D(Y) that satisfies the constraint C(X,Y)",
    explanation: "Arc consistency requires every value in X's domain to have at least one supporting value in Y's domain."
  },
  {
    id: "ac3-domain-empty",
    topic: "Constraint satisfaction",
    question: "What does AC-3 conclude if it removes values until some variable's domain is empty?",
    choices: ["There is no solution", "The remaining assignment is complete", "The CSP is arc-consistent", "The variable can be ignored"],
    answer: "There is no solution",
    explanation: "An empty domain means no value remains for that variable, so the CSP has no solution under the current constraints."
  },
  {
    id: "ac-not-sufficient",
    topic: "Constraint satisfaction",
    question: "Why can an arc-consistent CSP still have no solution?",
    choices: [
      "Pairwise support does not guarantee one globally consistent assignment",
      "Arc consistency only works for game trees",
      "AC-3 always deletes every valid value",
      "Arc consistency requires every domain to be a singleton"
    ],
    answer: "Pairwise support does not guarantee one globally consistent assignment",
    explanation: "The crib sheet's three variables with pairwise inequality and two colors are arc-consistent, but cannot all receive different colors."
  },
  {
    id: "mrv",
    topic: "Constraint satisfaction",
    question: "What does the MRV heuristic select when choosing the next CSP variable?",
    choices: ["The variable with the fewest legal values remaining", "The variable with the largest domain", "The value ruling out the fewest neighbor values", "The variable with the shallowest search depth"],
    answer: "The variable with the fewest legal values remaining",
    explanation: "Minimum Remaining Values selects the most constrained unassigned variable, the one with the fewest legal values."
  },
  {
    id: "lcv",
    topic: "Constraint satisfaction",
    question: "What does the Least Constraining Value (LCV) heuristic prefer?",
    choices: ["The value that rules out the fewest values in neighboring variables", "The variable with the fewest legal values", "The value with the highest path cost", "The first value in the domain"],
    answer: "The value that rules out the fewest values in neighboring variables",
    explanation: "LCV orders values by how little they constrain neighboring variables, preserving options for later assignments."
  },
  {
    id: "forward-checking",
    topic: "Constraint satisfaction",
    question: "After assigning X = x, what does forward checking do?",
    choices: [
      "Removes inconsistent values from unassigned neighbors and backtracks if a domain empties",
      "Enforces consistency between every pair of variables in the entire CSP",
      "Chooses the next value by path cost",
      "Changes the assignment to maximize utility"
    ],
    answer: "Removes inconsistent values from unassigned neighbors and backtracks if a domain empties",
    explanation: "Forward checking prunes the newly assigned variable's unassigned neighbors. Unlike AC-3, it does not continue propagating through the whole network."
  },
  {
    id: "csp-tree",
    topic: "Constraint satisfaction",
    question: "What is the stated time complexity for solving a tree-shaped CSP with n variables and domain size d?",
    choices: ["O(nd²)", "O(dⁿ)", "O(n²d)", "O(bᵐ)"],
    answer: "O(nd²)",
    explanation: "The crib sheet lists tree-structured CSP solving as O(nd²), compared with O(dⁿ) in the worst case."
  },
  {
    id: "minimax",
    topic: "Games and minimax",
    question: "In minimax, how does a MAX node evaluate its children?",
    choices: ["It takes the maximum child value", "It takes the minimum child value", "It averages the child values", "It chooses the child with the smallest heuristic"],
    answer: "It takes the maximum child value",
    explanation: "MAX selects the largest child value; MIN selects the smallest, assuming both players act optimally."
  },
  {
    id: "minimax-assumption",
    topic: "Games and minimax",
    question: "What opponent behavior does minimax assume when choosing a move?",
    choices: ["The opponent plays optimally to minimize MAX's outcome", "The opponent chooses randomly", "The opponent always makes a blunder", "The opponent cooperates with MAX"],
    answer: "The opponent plays optimally to minimize MAX's outcome",
    explanation: "Minimax chooses the best worst-case outcome against an optimal opponent; a move that could win if the opponent blunders may still be inferior."
  },
  {
    id: "alpha-beta-cutoff",
    topic: "Games and minimax",
    question: "When can alpha-beta pruning stop exploring the remaining children of a node?",
    choices: ["When α ≥ β", "When α = −∞", "When the heuristic is zero", "When the first child is a terminal state"],
    answer: "When α ≥ β",
    explanation: "Once α ≥ β, the branch cannot affect the final minimax choice, so the remaining children can be pruned."
  },
  {
    id: "alpha-beta-result",
    topic: "Games and minimax",
    question: "With correct alpha-beta pruning, how does the returned minimax decision compare with plain minimax?",
    choices: ["It is the same decision; pruning only avoids unnecessary work", "It is always more conservative", "It may change depending on child order", "It is optimal only when all leaves are terminal"],
    answer: "It is the same decision; pruning only avoids unnecessary work",
    explanation: "Alpha-beta pruning returns the same result as minimax. Child order affects how much pruning occurs, not the correctness of the answer."
  },
  {
    id: "evaluation-function",
    topic: "Games and minimax",
    question: "Why use an evaluation function at a depth cutoff in a game tree?",
    choices: [
      "Searching all the way to terminal states may be too expensive, so the function estimates position quality",
      "It guarantees that the game will end in a draw",
      "It replaces legal move generation",
      "It makes alpha-beta pruning unnecessary"
    ],
    answer: "Searching all the way to terminal states may be too expensive, so the function estimates position quality",
    explanation: "A cutoff evaluation quickly orders nonterminal states in a way that should correlate with eventual utility, enabling limited-depth search."
  }
];
