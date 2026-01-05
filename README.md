<p align="center">
  <img src="public/tesco-logo.svg" alt="RetailSync AI" width="200" />
</p>

<h1 align="center">RetailSync AI</h1>

<p align="center">
  <strong>AI-Powered Retail Media Ad Creation Platform</strong>
</p>

<p align="center">
  Built for <strong>Tesco Retail Media Hackathon 2025</strong> by Team Sarthak
</p>

<p align="center">
  <a href="#problem">Problem</a> •
  <a href="#solution">Solution</a> •
  <a href="#features">Features</a> •
  <a href="#ai-integration">AI</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#setup">Setup</a> •
  <a href="#team">Team</a>
</p>

---

## Overview

RetailSync AI transforms the retail advertisement creation process through intelligent automation. The platform combines a professional canvas editor with AI-powered design assistance, enabling retail media teams to create compliant, high-quality ads in minutes instead of hours.

**Live Demo:** [retail-sync-ai.vercel.app](https://retail-sync-ai.vercel.app)

---

## Problem

### Current Challenges in Retail Media

```mermaid
mindmap
  root((Retail Media Challenges))
    Manual Design
      4-6 hours per ad
      Specialized skills needed
    Brand Inconsistency
      30% revision rate
      Guideline violations
    Slow Delivery
      48-72 hours total
      Multiple approval rounds
    Resource Intensive
      Expensive tools
      Limited scalability
```

### The Traditional Workflow

```mermaid
flowchart LR
    A[ Brief] --> B[ Design Queue]
    B --> C[ Revisions]
    C --> D[ Compliance]
    D --> E[👍 Approval]
    
    A -.- |30 mins| A
    B -.- |24-48 hrs| B
    C -.- |3-4 rounds| C
    D -.- |2-4 hrs| D
    E -.- |1-2 hrs| E

    style A fill:#fee2e2,stroke:#dc2626
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#fef3c7,stroke:#f59e0b
    style D fill:#fef3c7,stroke:#f59e0b
    style E fill:#dcfce7,stroke:#16a34a
```

**Total: 48-72 hours per advertisement**

---

## Solution

RetailSync AI reduces ad creation time by **95%**:

```mermaid
graph LR
    subgraph Traditional[" TRADITIONAL"]
        T1[4-6 Hours]
    end
    
    subgraph RetailSync[" RETAILSYNC AI"]
        R1[< 5 Minutes]
    end

    Traditional -.->|95% Faster| RetailSync

    style Traditional fill:#fee2e2,stroke:#dc2626,stroke-width:2px
    style RetailSync fill:#d1fae5,stroke:#059669,stroke-width:2px
```

### How It Works

```mermaid
flowchart LR
    subgraph Step1[" STEP 1"]
        Upload[Upload Assets]
    end
    
    subgraph Step2[" STEP 2"]
        AI[AI Design Assistant]
    end
    
    subgraph Step3[" STEP 3"]
        Export[Export & Deploy]
    end

    Step1 -->|Product Images| Step2
    Step2 -->|Compliant Ads| Step3

    style Step1 fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Step2 fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style Step3 fill:#d1fae5,stroke:#059669,stroke-width:2px
```

---

## Features

### Feature Overview

```mermaid
flowchart TB
    subgraph Core[" CORE FEATURES"]
        Canvas[Canvas Editor]
        AI[AI Agent]
        BG[Background Removal]
    end

    subgraph Assets[" ASSET MANAGEMENT"]
        Stock[Stock Images]
        Library[Asset Library]
        Templates[Templates]
    end

    subgraph Output[" OUTPUT"]
        Export[Multi-format Export]
        Compliance[Brand Compliance]
        Quality[Quality Check]
    end

    Core --> Assets
    Assets --> Output

    style Core fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Assets fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style Output fill:#d1fae5,stroke:#059669,stroke-width:2px
```

### Canvas Editor

Professional-grade design environment built with Fabric.js:

| Feature | Description |
|---------|-------------|
| Multi-layer | Z-index management for complex compositions |
| Transform | Resize, rotate, flip, align objects |
| Grid & Snap | Precision positioning with guides |
| Preview | Real-time preview across formats |
| History | Full undo/redo support |
| Shortcuts | Professional keyboard shortcuts |

### AI Agent (70+ Commands)

Natural language design assistant powered by Groq LLaMA 3.3:

```mermaid
flowchart LR
    subgraph Commands[" AI AGENT COMMANDS"]
        direction TB
        Shapes[Shapes]
        Text[Text]
        BG[Background]
        Transform[Transform]
        Effects[Effects]
        Retail[Retail Elements]
    end

    User[ User] -->|Natural Language| Commands
    Commands -->|Execute| Canvas[ Canvas]

    style Commands fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style User fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Canvas fill:#d1fae5,stroke:#059669,stroke-width:2px
```

| Category | Commands |
|----------|----------|
| **Shapes** | `add circle`, `add rectangle`, `add star`, `add triangle` |
| **Text** | `add text SALE`, `add heading`, `add curved text` |
| **Background** | `red background`, `gradient bg`, `blur background` |
| **Transform** | `flip horizontal`, `rotate 45`, `scale 150%` |
| **Arrange** | `bring to front`, `align center`, `distribute` |
| **Effects** | `add shadow`, `add glow`, `add border` |
| **Retail** | `add price tag ₹999`, `add ribbon`, `add badge` |
| **Image** | `remove background`, `apply filter`, `crop` |
| **Export** | `export png`, `export jpeg`, `export webp` |

**Sample AI Commands:**

```bash
# Add elements
"add circle"
"add rectangle blue"
"add text Special Offer"
"add heading 50% OFF"

# Background
"set background to red"
"gradient background blue purple"
"blur background"

# Transform
"flip selected horizontally"
"rotate 90 degrees"
"scale up 150%"

# Retail specific
"add price tag ₹999"
"add sale ribbon"
"add product placeholder"

# Effects
"add drop shadow"
"add glow effect"
"add border"
```

### Background Removal

One-click AI-powered background removal via Remove.bg API:

```mermaid
flowchart LR
    A[ Original Image] -->|AI Processing| B[ Transparent BG]
    
    style A fill:#fee2e2,stroke:#dc2626,stroke-width:2px
    style B fill:#d1fae5,stroke:#059669,stroke-width:2px
```

### Stock Images Library

Integrated Pexels API for royalty-free imagery:

| Feature | Description |
|---------|-------------|
| Search | Millions of royalty-free images |
| Categories | Pre-curated retail collections |
| One-click | Direct add to canvas |
| Quality | High-resolution downloads |

### Brand Compliance

Real-time validation against brand guidelines:

```mermaid
flowchart LR
    Design[ Design] --> Check{ Compliance Check}
    Check -->|Pass| Export[ Export]
    Check -->|Fail| Fix[ Auto-Fix Suggestions]
    Fix --> Design

    style Design fill:#dbeafe,stroke:#2563eb
    style Check fill:#fef3c7,stroke:#f59e0b
    style Export fill:#d1fae5,stroke:#059669
    style Fix fill:#fee2e2,stroke:#dc2626
```

| Check | Status |
|-------|--------|
| Logo placement |  Validated |
| Color palette |  Enforced |
| Typography |  Guidelines met |
| Font sizes |  Minimum met |
| Aspect ratio |  Correct |
| Spacing |  Brand compliant |

### Export Options

Multiple format support for various platforms:

| Format | Quality | Use Case |
|--------|---------|----------|
| PNG | Lossless | Transparency support |
| JPEG | Adjustable | Web optimization |
| WebP | Best | Modern browsers |

---

## AI Integration

### Architecture Overview

```mermaid
flowchart TB
    subgraph Client[" CLIENT LAYER"]
        UI[Next.js Frontend]
        Canvas[Canvas Editor]
        State[React State]
    end

    subgraph API[" API LAYER"]
        Routes[Next.js API Routes]
        Auth[NextAuth.js]
    end

    subgraph AI[" AI SERVICES"]
        Groq[Groq LLaMA 3.3 70B]
        RemoveBG[Remove.bg API]
        Pexels[Pexels API]
    end

    subgraph DB[" DATABASE"]
        MongoDB[(MongoDB Atlas)]
    end

    UI --> Routes
    Canvas --> UI
    State --> Canvas
    Routes --> Auth
    Routes --> Groq
    Routes --> RemoveBG
    Routes --> Pexels
    Auth --> MongoDB

    style Client fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
    style API fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style AI fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style DB fill:#dcfce7,stroke:#16a34a,stroke-width:2px
```

### AI Copilot Flow

```mermaid
sequenceDiagram
    participant U as  User
    participant E as  Editor
    participant A as  API
    participant G as  Groq AI
    participant C as  Canvas

    U->>E: "add red circle"
    E->>A: POST /api/ai-copilot
    A->>G: Process Command
    G-->>A: Actions Array
    A-->>E: { command: "addCircle", params: { color: "red" } }
    E->>C: Execute Command
    C-->>U: Circle Added 
```

### Supported AI Models

| Service | Model | Purpose |
|---------|-------|---------|
| Groq | LLaMA 3.3 70B Versatile | Natural language command processing |
| Remove.bg | AI Background Removal | Product image background removal |
| Pexels | Image Search API | Stock image discovery |

---

## Architecture

### System Overview

```mermaid
flowchart TB
    subgraph Frontend[" FRONTEND"]
        direction TB
        Next[Next.js 16]
        React[React 19]
        Fabric[Fabric.js Canvas]
        Tailwind[Tailwind CSS]
    end

    subgraph Backend[" BACKEND"]
        direction TB
        APIRoutes[API Routes]
        NextAuth[NextAuth.js]
        Middleware[Middleware]
    end

    subgraph External[" EXTERNAL SERVICES"]
        direction TB
        Google[Google OAuth]
        Groq[Groq AI]
        RemoveBG[Remove.bg]
        PexelsAPI[Pexels]
    end

    subgraph Database[" DATABASE"]
        MongoDB[(MongoDB Atlas)]
    end

    Frontend --> Backend
    Backend --> External
    Backend --> Database
    NextAuth --> Google
    APIRoutes --> Groq
    APIRoutes --> RemoveBG
    APIRoutes --> PexelsAPI

    style Frontend fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Backend fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
    style External fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style Database fill:#d1fae5,stroke:#059669,stroke-width:2px
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as  User
    participant F as  Frontend
    participant N as  NextAuth
    participant G as  Google
    participant D as  MongoDB

    U->>F: Click "Sign in with Google"
    F->>N: Initiate OAuth
    N->>G: Redirect to Google
    G->>U: Show Consent Screen
    U->>G: Approve
    G->>N: Return Token
    N->>D: Save Session
    D-->>N: Session Stored
    N->>F: Redirect to Dashboard
    F-->>U: Welcome! 
```

### Data Flow

```mermaid
flowchart LR
    subgraph Input[" INPUT"]
        Upload[Upload Image]
        Command[AI Command]
        Template[Select Template]
    end

    subgraph Process[" PROCESSING"]
        Canvas[Canvas Editor]
        AI[AI Agent]
        Compliance[Compliance Check]
    end

    subgraph Output[" OUTPUT"]
        PNG[PNG Export]
        JPEG[JPEG Export]
        WebP[WebP Export]
    end

    Upload --> Canvas
    Command --> AI
    Template --> Canvas
    AI --> Canvas
    Canvas --> Compliance
    Compliance --> PNG
    Compliance --> JPEG
    Compliance --> WebP

    style Input fill:#fce7f3,stroke:#db2777,stroke-width:2px
    style Process fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
    style Output fill:#d1fae5,stroke:#059669,stroke-width:2px
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| Fabric.js | 7.1.0 | Canvas manipulation |
| Lucide React | 0.562.0 | Icon library |

### Backend

| Technology | Purpose |
|------------|---------|
| Next.js API Routes | Backend endpoints |
| NextAuth.js | Authentication |
| MongoDB + Mongoose | Database |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT tokens |

### AI & ML

| Service | Purpose |
|---------|---------|
| Groq LLaMA 3.3 70B | Natural language processing |
| Remove.bg API | Background removal |
| Pexels API | Stock images |
| TensorFlow.js | Client-side ML |

---

## Project Structure

```
retailsync-nextjs/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── ai-copilot/           # AI Agent endpoint
│   │   │   ├── auth/                 # NextAuth endpoints
│   │   │   ├── remove-bg/            # Background removal
│   │   │   └── huggingface/          # ML inference
│   │   │
│   │   ├── auth/                     # Auth pages
│   │   ├── dashboard/                # User dashboard
│   │   ├── editor/                   # Canvas editor
│   │   ├── templates/                # Template gallery
│   │   ├── analytics/                # Analytics dashboard
│   │   ├── profile/                  # User profile
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Global styles
│   │
│   ├── components/
│   │   ├── canvas/                   # Canvas components
│   │   ├── editor/                   # Editor panels
│   │   │   ├── AICopilotPanel.tsx    # AI Agent (70+ commands)
│   │   │   ├── AICopyWriter.tsx      # Copy generation
│   │   │   ├── AIQualityPrediction.tsx
│   │   │   ├── AssetLibrary.tsx      # Asset management
│   │   │   ├── CanvasEditor.tsx      # Main editor
│   │   │   ├── CompliancePanel.tsx   # Brand compliance
│   │   │   ├── ExportPanel.tsx       # Export options
│   │   │   ├── LayersPanel.tsx       # Layer management
│   │   │   ├── PropertiesPanel.tsx   # Object properties
│   │   │   ├── StockImagesLibrary.tsx # Pexels integration
│   │   │   ├── TemplateMarketplace.tsx
│   │   │   └── Toolbar.tsx           # Editor toolbar
│   │   │
│   │   ├── layout/                   # Layout components
│   │   ├── providers/                # Context providers
│   │   └── ui/                       # Reusable UI components
│   │
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utilities
│   ├── models/                       # MongoDB models
│   ├── styles/                       # Additional styles
│   └── types/                        # TypeScript types
│
├── public/                           # Static assets
│   ├── team/                         # Team photos
│   └── tesco-logo.svg                # Brand assets
│
├── docs/                             # Documentation
│
├── .env.local                        # Environment variables
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies
```

---

## Setup

### Prerequisites

```
Node.js      >= 18.0.0
npm          >= 9.0.0
MongoDB      Atlas account
```

### Environment Variables

Create `.env.local` in the root directory:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/retailsync

# AI Services
GROQ_API_KEY=your-groq-api-key
REMOVE_BG_API_KEY=your-removebg-api-key
PEXELS_API_KEY=your-pexels-api-key
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yashodipmore/RetailSync-AI.git

# Navigate to project
cd RetailSync-AI/retailsync-nextjs

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

### Deployment

The project is configured for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## API Reference

### AI Copilot

```
POST /api/ai-copilot

Request:
{
  "messages": [
    { "role": "user", "content": "add red circle" }
  ],
  "canvasContext": {
    "width": 728,
    "height": 90,
    "objectCount": 5
  }
}

Response:
{
  "message": "Added a red circle to the canvas",
  "actions": [
    {
      "command": "addCircle",
      "params": { "color": "#ff0000" }
    }
  ]
}
```

### Background Removal

```
POST /api/remove-bg

Request:
{
  "image": "base64-encoded-image"
}

Response:
{
  "result": "base64-encoded-transparent-image"
}
```

---

## Performance

```mermaid
pie title Lighthouse Scores
    "Performance" : 95
    "Accessibility" : 90
    "Best Practices" : 95
    "SEO" : 100
```

| Metric | Target | Status |
|--------|--------|--------|
| LCP | < 2.5s |  |
| FID | < 100ms |  |
| CLS | < 0.1 |  |

---

## Roadmap

```mermaid
gantt
    title RetailSync AI Roadmap 2026
    dateFormat  YYYY-MM
    section Q1
    Multi-user Collaboration    :2026-01, 3M
    Version History            :2026-01, 2M
    Template Builder           :2026-02, 2M
    section Q2
    A/B Testing Integration    :2026-04, 2M
    Analytics Dashboard        :2026-04, 3M
    Batch Processing           :2026-05, 2M
    section Q3
    Mobile App                 :2026-07, 3M
    Plugin System              :2026-07, 2M
    White-label Solution       :2026-08, 2M
```

| Quarter | Feature | Status |
|---------|---------|--------|
| Q1 2026 | Multi-user collaboration | 🔜 Planned |
| Q1 2026 | Version history | 🔜 Planned |
| Q2 2026 | A/B testing | 🔜 Planned |
| Q2 2026 | Analytics dashboard | 🔜 Planned |
| Q3 2026 | Mobile app | 🔜 Planned |

---

## Team Sarthak

<table>
  <tr>
    <td align="center">
      <strong>Yashodip More</strong><br/>
      Full Stack Developer<br/>
      <em>AI Integration</em>
    </td>
    <td align="center">
      <strong>Komal Kumavat</strong><br/>
      UI/UX Designer<br/>
      <em>Design Systems</em>
    </td>
    <td align="center">
      <strong>Jaykumar Girase</strong><br/>
      Backend Developer<br/>
      <em>API Architecture</em>
    </td>
    <td align="center">
      <strong>Tejas Patil</strong><br/>
      ML Engineer<br/>
      <em>Model Training</em>
    </td>
  </tr>
</table>

**Sandip University, Nashik** — Final Year B.Tech Students

---

## License

This project was created for the **Tesco Retail Media Hackathon 2025**.

---

<p align="center">
  <strong>RetailSync AI</strong> — Transforming Retail Media Creation
</p>
