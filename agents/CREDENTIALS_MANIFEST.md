# Agent Squad — Credentials Manifest

> **BlackWolf-Media | Todd Rhoades**  
> Last updated: 2026-05-21  
> Railway Project: `Agents` (65350c6b-f2d3-41a0-899a-71e2f69e5d7c)

This file tracks all credentials required across the agent squad.
Actual values are stored in Railway environment variables — never committed here.
Status: ✅ Set | ⚠️ Placeholder | ❌ Missing

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    AGENT SQUAD                       │
│                                                      │
│  Ahtlas (PA) ──► Athena (Orchestrator)               │
│                       │                             │
│            ┌──────────┼──────────┐                  │
│            ▼          ▼          ▼                   │
│          Coeus      Hermes    Spacebot               │
│       (Knowledge) (Messenger) (Discord)              │
│            │          │          │                   │
│            └──────────┼──────────┘                  │
│                       ▼                              │
│              n8n Primary (Tool Yard)                 │
│              http://primary.railway.internal:5678    │
│                       │                              │
│         ┌─────────────┼──────────────┐               │
│         ▼             ▼              ▼               │
│      Postgres        Redis         Worker            │
│     (Memory)       (Queue)        (Executor)         │
└─────────────────────────────────────────────────────┘
```

### Worker & Runner — What They Do
- **Worker**: The background job executor. Picks up queued tasks from Redis and runs n8n workflow steps. It is NOT an AI agent — it's the engine that executes.
- **Runner**: The task runner sidecar that Worker hands specific execution tasks to. Also infrastructure, not an agent persona.
- **Neither Worker nor Runner gets a system prompt** — they are pure execution infrastructure.

---

## Internal Private Network URLs (Railway)

| Service | Internal Hostname | Port |
|---------|------------------|------|
| Primary (n8n) | `primary.railway.internal` | 5678 |
| Athena | `hermes-agent-1f2e.railway.internal` | 8642 |
| Coeus | `hermes-agent.railway.internal` | 9119 |
| Hermes | `hermes-agent-53e0.railway.internal` | 8642 |
| Ahtlas | `hermes-agent-9455.railway.internal` | 8642 |
| Spacebot | `spacebot.railway.internal` | 19898 |
| Redis | `${{Redis.REDISHOST}}` | 6379 |
| Postgres | `${{Postgres.PGHOST}}` | 5432 |

---

## Shared Credentials (All Agents Need These)

| Variable | Status | Notes |
|----------|--------|-------|
| `OPENROUTER_API_KEY` | ⚠️ Placeholder | Primary LLM provider. Get at openrouter.ai/keys |
| `TAVILY_API_KEY` | ✅ Set | `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` |
| `PERPLEXITY_API_KEY` | ⚠️ Placeholder | For search. Get at perplexity.ai |
| `EXA_API_KEY` | ⚠️ Placeholder | AI web search. Get at exa.ai |
| `FIRECRAWL_API_KEY` | ⚠️ Placeholder | Web crawl/extract. Get at firecrawl.dev |
| `GITHUB_TOKEN` | ⚠️ Placeholder | Skills Hub PAT. Get at github.com/settings/tokens |
| `BROWSERBASE_API_KEY` | ⚠️ Placeholder | Browser automation. Get at browserbase.com |
| `BROWSERBASE_PROJECT_ID` | ⚠️ Placeholder | From Browserbase dashboard |
| `N8N_API_KEY` | ⚠️ Placeholder | Set from n8n Settings > API > Create key |

---

## Agent-Specific Credentials

### Athena — Orchestrator
- **Port**: 8642
- **Railway Service**: athena
- **Role**: Central coordinator and task router

| Variable | Status | Notes |
|----------|--------|-------|
| `ADMIN_PASSWORD` | ✅ Set | Admin panel access |
| `ADMIN_USERNAME` | ✅ Set | admin |
| `SLACK_BOT_TOKEN` | ⚠️ Placeholder | Athena's Slack bot |
| `SLACK_APP_TOKEN` | ⚠️ Placeholder | Socket Mode token |
| `SLACK_ALLOWED_USERS` | ⚠️ Placeholder | Your Slack user ID |
| `TELEGRAM_BOT_TOKEN` | ⚠️ Placeholder | Athena's Telegram bot |
| `TELEGRAM_ALLOWED_USERS` | ⚠️ Placeholder | Your Telegram user ID |

---

### Coeus — Knowledge Holder
- **Port**: 9119
- **Railway Service**: coeus
- **Role**: Research, memory, and knowledge retrieval

| Variable | Status | Notes |
|----------|--------|-------|
| `GATEWAY_ALLOW_ALL_USERS` | ✅ Set | true |
| `HERMES_HOME` | ✅ Set | /opt/data |
| `SLACK_BOT_TOKEN` | ⚠️ Placeholder | Coeus's Slack bot |
| `TELEGRAM_BOT_TOKEN` | ⚠️ Placeholder | Coeus's Telegram bot |

---

### Hermes — The Messenger
- **Port**: 8642
- **Railway Service**: Hermes
- **Role**: Communications, notifications, message routing

| Variable | Status | Notes |
|----------|--------|-------|
| `SLACK_BOT_TOKEN` | ⚠️ Placeholder | Hermes's Slack bot |
| `TELEGRAM_BOT_TOKEN` | ⚠️ Placeholder | Hermes's Telegram bot |
| `EMAIL_ADDRESS` | ⚠️ Placeholder | Hermes's sending email |
| `EMAIL_PASSWORD` | ⚠️ Placeholder | Gmail App Password |

---

### Ahtlas — Executive Personal Assistant to Todd Rhoades
- **Port**: 8642
- **Railway Service**: Ahtlas
- **Persona**: Ahtlas BlackWolf
- **Role**: Todd's direct PA — scheduling, priorities, briefings, task coordination

| Variable | Status | Notes |
|----------|--------|-------|
| `SLACK_BOT_TOKEN` | ⚠️ Placeholder | Ahtlas's Slack bot (Todd's primary interface) |
| `TELEGRAM_BOT_TOKEN` | ⚠️ Placeholder | Ahtlas Telegram bot |
| `TELEGRAM_HOME_CHANNEL` | ⚠️ Placeholder | Todd's Command Channel ID |
| `EMAIL_ADDRESS` | ⚠️ Placeholder | Ahtlas's email address |
| `EMAIL_HOME_ADDRESS` | ⚠️ Placeholder | Todd's email address |

---

### Spacebot — Discord/Space Interface
- **Port**: 19898
- **Railway Service**: Spacebot
- **Image**: ghcr.io/spacedriveapp/spacebot:latest
- **Role**: Discord bot interface for the squad

| Variable | Status | Notes |
|----------|--------|-------|
| `DISCORD_TOKEN` | ⚠️ Placeholder | Discord bot token |
| `DISCORD_CLIENT_ID` | ⚠️ Placeholder | Discord app client ID |
| `DISCORD_GUILD_ID` | ⚠️ Placeholder | Your Discord server ID |

---

## n8n Primary — Tool Yard Configuration

All agents connect to n8n via:
- **Internal**: `http://primary.railway.internal:5678`
- **Webhooks**: `http://primary.railway.internal:5678/webhook`
- **Public**: See `N8N_EDITOR_BASE_URL` in Primary Railway vars

| Variable | Status | Notes |
|----------|--------|-------|
| `DB_TYPE` | ✅ Set | postgresdb |
| `EXECUTIONS_MODE` | ✅ Set | queue |
| `QUEUE_BULL_REDIS_*` | ✅ Set | Railway Redis references |
| `N8N_ENCRYPTION_KEY` | ✅ Set | jZx-tF!S~!vPlCNkC9SRU9N_5c9AneQ4 |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | ✅ Set | true |

---

## How to Fill In Placeholders

1. **OpenRouter** — https://openrouter.ai/keys → Create key
2. **Perplexity** — https://www.perplexity.ai/settings/api → Generate
3. **Exa** — https://exa.ai → Dashboard → API Keys
4. **Firecrawl** — https://firecrawl.dev → API Keys
5. **GitHub PAT** — https://github.com/settings/tokens → Fine-grained → All BlackWolf-Media repos
6. **Browserbase** — https://browserbase.com → Dashboard
7. **Slack Bots** — https://api.slack.com/apps → Create one bot per agent
8. **Telegram Bots** — Message @BotFather → /newbot → one per agent
9. **Discord Token** — https://discord.com/developers/applications
10. **n8n API Key** — Open Primary → Settings → n8n API → Create key

---

## Recommended LLM Models per Agent (via OpenRouter)

| Agent | Recommended Model | Why |
|-------|------------------|-----|
| Ahtlas | anthropic/claude-opus-4 | Speaks directly to Todd — needs best judgment |
| Athena | anthropic/claude-sonnet-4 | Complex orchestration reasoning |
| Coeus | perplexity/sonar-pro | Research and knowledge retrieval |
| Hermes | google/gemini-2.0-flash | Fast messaging and routing |
| Spacebot | N/A (not hermes-agent) | Uses Discord API directly |