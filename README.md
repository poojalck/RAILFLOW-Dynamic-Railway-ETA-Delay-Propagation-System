# 🚆 RAILFLOW – Dynamic Railway ETA & Delay Propagation System

> **Predict the disruption → Understand the ripple → Simulate interventions → Support better decisions**

RAILFLOW is an interactive railway operations and decision-support system designed to model how train delays propagate through a railway network.

Instead of treating each train's ETA independently, RAILFLOW models the railway as a **shared-resource network**, where trains compete for infrastructure such as tracks, junctions, platforms, and crossings.

When one train is delayed, RAILFLOW identifies the affected dependencies, detects potential conflicts, propagates the resulting delays through the network, and allows operators to simulate possible interventions using **what-if analysis**.

---

## 🎯 Problem Statement

### SIH26028 – Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains

Traditional ETA calculation alone does not provide the complete operational picture of a railway network.

A delay affecting one train can potentially create conflicts with other trains competing for the same railway resources.

For example:

```text
Train A
   │
   │ +15 min delay
   ▼
Junction J1
   │
   │ resource conflict
   ▼
Train B
   │
   │ +8 min
   ▼
Platform P2
   │
   ▼
Train C
   │
   │ +4 min
   ▼
Network-wide delay
```

Therefore, the challenge is not only to estimate **when a train will arrive**, but also to understand how changes in train schedules and resource availability can affect the rest of the network.

---

# 💡 Our Solution

RAILFLOW creates a computational model of the railway network and continuously evaluates:

* Train schedules
* Current train delays
* Railway resources
* Resource occupancy
* Train-resource dependencies
* Potential conflicts
* Delay propagation
* Alternative interventions

The system provides an interactive operational view where users can:

1. Monitor trains and their predicted ETA
2. Detect potential infrastructure conflicts
3. Visualize cascading delays
4. Simulate hypothetical disruptions
5. Test possible interventions
6. Compare the resulting network impact

---

# 🧠 Core Concept

RAILFLOW represents railway operations as a **dependency and resource network**.

```text
Train
  │
  ▼
Track Section
  │
  ▼
Junction
  │
  ▼
Platform
  │
  ▼
Station
```

Multiple trains can depend on the same resource.

```text
Train A ───────┐
               │
               ▼
           Junction J1
               ▲
               │
Train B ───────┘
```

If their resource occupancy windows overlap, RAILFLOW identifies a potential conflict.

---

# ⚙️ System Architecture

```text
                    ┌───────────────────┐
                    │     Frontend      │
                    │ Interactive UI    │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │      Backend      │
                    │    REST APIs      │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
        Train Data      Network Data      Event Data
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                    ┌───────────────────┐
                    │  RAILFLOW Engine  │
                    ├───────────────────┤
                    │ ETA Calculation   │
                    │ Conflict Detection│
                    │ Delay Propagation  │
                    │ Max-Plus Modeling  │
                    │ What-If Simulation │
                    │ Intervention Eval. │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Results & Alerts  │
                    │ ETA / Conflicts   │
                    │ Delay Ripple      │
                    │ Scenarios         │
                    └───────────────────┘
```

---

# 🚆 Key Features

## 1. Dynamic ETA Estimation

RAILFLOW calculates predicted train arrival times using the current operational state and railway constraints.

The ETA is treated as a dynamic value rather than simply relying on the original timetable.

---

## 2. Railway Resource Modeling

The system models infrastructure resources such as:

* Track sections
* Junctions
* Platforms
* Crossings
* Stations

Each train is associated with the resources it requires along its route.

---

## 3. Conflict Detection

RAILFLOW detects situations where multiple trains may require the same resource during overlapping time windows.

Example:

```text
Train A → Junction J1
10:20 – 10:25

Train B → Junction J1
10:23 – 10:28

Result:
⚠️ Potential resource conflict
```

---

## 4. Delay Propagation

A delay affecting one train can propagate through dependent resources and trains.

```text
Train A
 +15 min
    │
    ▼
Junction J1
    │
    ▼
Train B
 +8 min
    │
    ▼
Platform P2
    │
    ▼
Train C
 +4 min
```

This allows the system to visualize the **delay ripple across the network**.

---

## 5. Max-Plus Based Event-Time Modeling

RAILFLOW uses the concept of **max-plus event-time computation** to determine feasible event times under operational constraints.

Conceptually:

```text
Earliest feasible time =
MAX(
    scheduled/event time,
    train availability,
    resource availability + safety/headway constraint
)
```

This allows the model to respect dependencies instead of simply adding a fixed delay to every event.

---

## 6. Incremental Recalculation

When a train's state changes, the entire railway network does not necessarily need to be recalculated.

RAILFLOW identifies the affected dependency chain and updates the relevant portion of the network.

```text
Train A
   ↓
Junction J1
   ↓
Train B
   ↓
Platform P2
   ↓
Train C
```

This provides a basis for faster updates as the network state changes.

---

# 🧪 What-If Simulation

RAILFLOW allows users to modify operational conditions and observe the potential consequences.

Example:

```text
Scenario 1
Train A delay = +15 min

        ↓

Scenario 2
Train A delay = +25 min

        ↓

Compare:
• Train ETAs
• Conflicts
• Affected trains
• Total propagated delay
```

Users can also simulate operational interventions such as holding or releasing a train and observe the resulting network state.

---

# 🧠 Intervention Analysis

The system can evaluate alternative operational scenarios.

For example:

```text
Current Situation
       │
       ▼
Potential conflict
       │
       ├───────────────┐
       ▼               ▼
Hold Train A      Hold Train B
       │               │
       ▼               ▼
Simulate           Simulate
       │               │
       └───────┬───────┘
               ▼
       Compare network impact
```

The purpose is to provide operators with quantitative information about the consequences of different scenarios.

---

# ⏱️ Time-Machine Visualization

RAILFLOW can represent the evolution of a disruption over time.

```text
10:30 ───── 10:35 ───── 10:40 ───── 10:45 ───── 10:50
                │
                ▼
           Initial delay
                         │
                         ▼
                   Junction conflict
                                  │
                                  ▼
                              Train B delay
                                             │
                                             ▼
                                         Train C delay
```

The timeline helps users understand **when and how a disruption spreads**.

---

# 🖥️ Dashboard

The RAILFLOW dashboard provides an operational view of the railway network.

The interface can display:

* Active trains
* Train ETA
* Current delays
* Network status
* Conflicts
* Affected resources
* Delay propagation
* Scenario results
* Intervention simulations

---

# 🔄 End-to-End Workflow

```text
Railway Data
     ↓
Train & Resource Modeling
     ↓
Dependency Graph
     ↓
Current Operational State
     ↓
ETA Calculation
     ↓
Conflict Detection
     ↓
Delay Propagation
     ↓
Affected Network Identification
     ↓
What-If Simulation
     ↓
Intervention Analysis
     ↓
Updated Network State
     ↓
Dashboard Visualization
```

---

# 🛠️ Technology Stack

### Frontend

* React
* JavaScript
* HTML
* CSS
* Interactive data visualization

### Backend

* Python / FastAPI
* REST APIs

### Algorithms

* Graph-based dependency modeling
* Conflict detection
* Delay propagation
* Max-plus event-time modeling
* Incremental recomputation
* Scenario simulation
* Constraint-based intervention analysis

### Data

* Train schedules
* Route information
* Railway infrastructure
* Resource occupancy
* Simulated operational events

> Technology choices may evolve as the prototype is expanded.

---

# 📊 Example Scenario

Consider three trains:

```text
Train A → Junction J1 → Station S1
Train B → Junction J1 → Platform P2
Train C → Platform P2 → Station S2
```

Initially:

```text
A = 10:00
B = 10:05
C = 10:15
```

Train A receives a simulated delay:

```text
A = +15 minutes
```

RAILFLOW recalculates the affected resource dependencies.

Potential result:

```text
Train A
+15 min
   ↓
Junction J1 conflict
   ↓
Train B
+8 min
   ↓
Platform P2 conflict
   ↓
Train C
+4 min
```

The operator can then create a what-if scenario and examine how a different operational decision changes the network state.

---

# 🎯 Project Objectives

* Develop a dynamic railway ETA modeling system
* Represent railway infrastructure as shared resources
* Detect potential train-resource conflicts
* Model cascading delay propagation
* Enable interactive disruption simulation
* Support what-if operational analysis
* Provide an interpretable railway operations dashboard
* Reduce the need to manually reason about complex dependency chains

---

# 🌟 What Makes RAILFLOW Different?

A conventional railway visualization primarily answers:

> **Where is the train?**

RAILFLOW aims to answer:

> **What is likely to happen next in the network?**

and:

> **How could a change in one part of the network affect other trains and resources?**

This shifts the focus from **individual train tracking** toward **network-level operational awareness**.

---

# 👥 Target Users

RAILFLOW is designed as a decision-support prototype for railway operations such as:

* Traffic control rooms
* Railway operations teams
* Station operations
* Dispatching and traffic management
* Railway planning and simulation

It is **not intended as a passenger-facing train tracking application**.

---

# 🚀 Future Scope

Future versions can incorporate:

* Real-time railway feeds
* Historical train movement data
* Machine-learning-based delay prediction
* More detailed signalling constraints
* Platform assignment optimization
* Larger railway networks
* Real-time event streaming
* Advanced optimization algorithms
* Historical disruption analysis
* Network-level performance analytics

---

# 🏆 Hackathon Context

**Smart India Hackathon – SIH26028**

**Problem Area:** Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains

RAILFLOW was developed as a prototype exploring dynamic ETA prediction, railway resource conflicts, delay propagation, and operational decision support.

---

# 📁 Project Structure

```text
RAILFLOW/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── ...
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── engine/
│   ├── algorithms/
│   └── ...
│
├── data/
│   ├── trains/
│   ├── routes/
│   └── infrastructure/
│
├── simulation/
│   ├── scenarios/
│   └── events/
│
├── docs/
│   └── architecture/
│
├── README.md
└── requirements.txt
```

---

# 👩‍💻 Team

**Team:** [Your Team Name]

**Project:** RAILFLOW

**Hackathon:** Smart India Hackathon

---

# ⚠️ Disclaimer

RAILFLOW is a prototype and simulation-oriented decision-support system. It is not intended to directly control railway signalling, dispatching, or safety-critical infrastructure.

Operational decisions in real railway environments require validated infrastructure data, certified systems, safety constraints, and authorized railway personnel.

---

# 📌 Project Vision

> **RAILFLOW transforms railway delay management from reactive monitoring into network-aware simulation and decision support.**

```text
Predict
   ↓
Understand
   ↓
Simulate
   ↓
Evaluate
   ↓
Decide
```

---
