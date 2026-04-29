import { 
  Cpu, 
  BarChart, 
  MessageSquare, 
  Shield, 
  Database, 
  Terminal, 
  FileCode, 
  Box, 
  Calculator, 
  UserCheck, 
  Megaphone, 
  Settings, 
  PenTool, 
  TrendingUp, 
  Zap, 
  Globe, 
  Mail, 
  Search, 
  Lock, 
  Server, 
  Layout, 
  Layers, 
  GitBranch, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Activity,
  Workflow,
  Share2,
  HardDrive,
  Snowflake,
  Code,
  Bug,
  RefreshCw,
  Link
} from 'lucide-react';

export interface NodeTemplate {
  type: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  parameters: Record<string, any>;
  color: string;
}

export const NODE_TEMPLATES: NodeTemplate[] = [
  // AI
  { type: 'logic-threshold', name: 'Inventory Threshold', category: 'Development', icon: Calculator, color: '#f59e0b', description: 'Filter items where Stock <= Reorder Level.', parameters: { stockField: 'Current_Quantity', thresholdField: 'Reorder_Level' } },
  { type: 'logic-group', name: 'Supplier Grouping', category: 'Development', icon: Layers, color: '#8b5cf6', description: 'Consolidate items by Primary Supplier.', parameters: { groupKey: 'Supplier_Email' } },
  { type: 'logic-sanitize', name: 'Folder Sanitize', category: 'Development', icon: Shield, color: '#10b981', description: 'Strip illegal characters from directory names.', parameters: { format: '{LastName}_{FirstName}' } },
  { type: 'logic-permissions', name: 'Permission Sync', category: 'Development', icon: Lock, color: '#3b82f6', description: 'Apply sharing rules to Drive entities.', parameters: { rules: {} } },
  { type: 'ai-openai', name: 'OpenAI Chat', category: 'AI', icon: Cpu, color: '#10a37f', description: 'Interact with GPT-3.5 or GPT-4 models.', parameters: { model: 'gpt-4', messages: [], temperature: 0.7 } },
  { type: 'ai-gemini', name: 'Gemini Pro', category: 'AI', icon: Cpu, color: '#4285f4', description: 'Multimodal AI by Google.', parameters: { model: 'gemini-1.5-pro', prompt: '={{ $json.message }}' } },
  { type: 'ai-vector-search', name: 'Vector Search', category: 'AI', icon: Search, color: '#8b5cf6', description: 'Semantic search in vector database.', parameters: { index: 'main', query: '' } },
  { type: 'ai-sentiment', name: 'Sentiment Analysis', category: 'AI', icon: Activity, color: '#f59e0b', description: 'Analyze emotional tone of text.', parameters: { text: '={{ $json.text }}' } },
  { type: 'ai-image-gen', name: 'Image Manifest', category: 'AI', icon: PenTool, color: '#ec4899', description: 'Generate images via DALL-E or Midjourney.', parameters: { prompt: '', size: '1024x1024' } },
  { type: 'ai-embedding', name: 'Embedding Gen', category: 'AI', icon: Layers, color: '#6366f1', description: 'Convert text into numerical vectors.', parameters: { model: 'text-embedding-3-small' } },
  { type: 'ai-claude', name: 'Anthropic Claude', category: 'AI', icon: Cpu, color: '#d97706', description: 'High-reasoning AI models.', parameters: { model: 'claude-3-opus' } },
  { type: 'ai-stt', name: 'Speech to Text', category: 'AI', icon: MessageSquare, color: '#06b6d4', description: 'Transcribe audio files to text.', parameters: { provider: 'whisper' } },
  { type: 'ai-tts', name: 'Text to Speech', category: 'AI', icon: MessageSquare, color: '#f43f5e', description: 'Synthesize voice from text.', parameters: { voice: 'alloy' } },
  { type: 'ai-vision', name: 'Object Vision', category: 'AI', icon: Search, color: '#14b8a6', description: 'Identify objects in images.', parameters: { detail: 'high' } },

  // Analytics
  { type: 'ana-traffic', name: 'Traffic Monitor', category: 'Analytics', icon: BarChart, color: '#3b82f6', description: 'Analyze incoming web traffic.', parameters: { interval: '1h' } },
  { type: 'ana-events', name: 'Event Tracker', category: 'Analytics', icon: Activity, color: '#10b981', description: 'Log and track custom UI events.', parameters: { eventName: '' } },
  { type: 'ana-conversion', name: 'Conversion Audit', category: 'Analytics', icon: TrendingUp, color: '#f59e0b', description: 'Measure conversion funnel health.', parameters: { goalId: '' } },
  { type: 'ana-journey', name: 'User Journey', category: 'Analytics', icon: Workflow, color: '#8b5cf6', description: 'Map user navigational paths.', parameters: { sessionId: '' } },
  { type: 'ana-funnel', name: 'Funnel Analysis', category: 'Analytics', icon: Layers, color: '#06b6d4', description: 'Visualize multi-step flow drops.', parameters: { steps: [] } },
  { type: 'ana-retention', name: 'Retention Map', category: 'Analytics', icon: Clock, color: '#6366f1', description: 'Analyze user return frequency.', parameters: { cohort: 'weekly' } },
  { type: 'ana-heatmap', name: 'Heatmap Gen', category: 'Analytics', icon: Layout, color: '#f43f5e', description: 'Generate click/scroll heatmaps.', parameters: { pageUrl: '' } },
  { type: 'ana-abtest', name: 'A/B Test Logic', category: 'Analytics', icon: GitBranch, color: '#ec4899', description: 'Split traffic between variants.', parameters: { variants: ['A', 'B'] } },
  { type: 'ana-aggregator', name: 'Data Aggregator', category: 'Analytics', icon: Database, color: '#14b8a6', description: 'Combine multiple data streams.', parameters: { operation: 'sum' } },
  { type: 'ana-trend', name: 'Trend Manifest', category: 'Analytics', icon: Zap, color: '#d97706', description: 'Predict future data trends.', parameters: { horizon: '30d' } },

  // Communication
  { type: 'comm-telegram', name: 'Telegram Bot', category: 'Communication', icon: MessageSquare, color: '#0088cc', description: 'Send/receive Telegram messages.', parameters: { chatId: '={{ $json.message.chat.id }}', text: '' } },
  { type: 'comm-slack', name: 'Slack Notify', category: 'Communication', icon: MessageSquare, color: '#4a154b', description: 'Post updates to Slack channels.', parameters: { channel: '#general' } },
  { type: 'comm-discord', name: 'Discord Webhook', category: 'Communication', icon: Globe, color: '#5865f2', description: 'Send triggers to Discord.', parameters: { content: '' } },
  { type: 'comm-email', name: 'SMTP Email', category: 'Communication', icon: Mail, color: '#ea4335', description: 'Send professional emails.', parameters: { to: '', subject: '', body: '' } },
  { type: 'comm-whatsapp', name: 'WhatsApp API', category: 'Communication', icon: MessageSquare, color: '#25d366', description: 'Enterprise WhatsApp messaging.', parameters: { phoneNumber: '' } },
  { type: 'comm-twilio', name: 'Twilio SMS', category: 'Communication', icon: Mail, color: '#f22f46', description: 'Send SMS globally.', parameters: { to: '', from: '' } },
  { type: 'comm-teams', name: 'MS Teams', category: 'Communication', icon: MessageSquare, color: '#6264a7', description: 'Collaborate via Teams channels.', parameters: { teamId: '' } },
  { type: 'comm-webhook-trig', name: 'Webhook Trigger', category: 'Communication', icon: Zap, color: '#10b981', description: 'Listen for external webhooks.', parameters: { path: '', method: 'POST' } },
  { type: 'comm-push', name: 'Push Notify', category: 'Communication', icon: Globe, color: '#3b82f6', description: 'Send mobile/browser push.', parameters: { deviceToken: '' } },
  { type: 'comm-voice', name: 'Voice Call', category: 'Communication', icon: MessageSquare, color: '#f59e0b', description: 'Initiate automated voice calls.', parameters: { script: '' } },

  // Cybersecurity
  { type: 'sec-portscan', name: 'Port Scanner', category: 'Cybersecurity', icon: Search, color: '#f43f5e', description: 'Audit open network ports.', parameters: { target: '={{ $json.ip }}' } },
  { type: 'sec-vulnerability', name: 'CVE Audit', category: 'Cybersecurity', icon: Shield, color: '#ef4444', description: 'Check system against CVEs.', parameters: { package: '' } },
  { type: 'sec-threat', name: 'Threat Intel', category: 'Cybersecurity', icon: Globe, color: '#8b5cf6', description: 'Real-time threat feeds.', parameters: { source: 'otx' } },
  { type: 'sec-firewall', name: 'Firewall Rule', category: 'Cybersecurity', icon: Lock, color: '#f59e0b', description: 'Manifest new firewall rules.', parameters: { action: 'block' } },
  { type: 'sec-ssl', name: 'SSL Checker', category: 'Cybersecurity', icon: Shield, color: '#10b981', description: 'Verify certificate health.', parameters: { domain: '' } },
  { type: 'sec-phishing', name: 'Phishing Detect', category: 'Cybersecurity', icon: MessageSquare, color: '#ec4899', description: 'Analyze links for scams.', parameters: { url: '' } },
  { type: 'sec-auth-audit', name: 'Auth Audit', category: 'Cybersecurity', icon: UserCheck, color: '#3b82f6', description: 'Monitor login patterns.', parameters: { user: 'all' } },
  { type: 'sec-ddos', name: 'DDoS Guard', category: 'Cybersecurity', icon: Shield, color: '#6366f1', description: 'Mitigation trigger for flood.', parameters: { threshold: 1000 } },
  { type: 'sec-malware', name: 'Malware Scan', category: 'Cybersecurity', icon: Search, color: '#ef4444', description: 'Deep file integrity audit.', parameters: { path: '/tmp' } },
  { type: 'sec-compliance', name: 'SOC2 Monitor', category: 'Cybersecurity', icon: CheckCircle2, color: '#14b8a6', description: 'Real-time compliance tracking.', parameters: { framework: 'SOC2' } },

  // Data & Storage
  { type: 'data-airtable', name: 'Airtable Sync', category: 'Data & Storage', icon: Database, color: '#18bfff', description: 'Monitor or update Airtable records.', parameters: { baseId: '', tableId: '', operation: 'list' } },
  { type: 'data-gsheets', name: 'Google Sheets', category: 'Data & Storage', icon: Layout, color: '#0f9d58', description: 'Sync logic with spreadsheets.', parameters: { documentId: '', sheetName: 'Sheet1', mode: 'append' } },
  { type: 'data-gdrive', name: 'Cortex Drive', category: 'Data & Storage', icon: HardDrive, color: '#4285f4', description: 'Manifest folders and manage files.', parameters: { action: 'createFolder', name: '={{ $json.name }}' } },
  { type: 'data-postgres', name: 'PostgreSQL', category: 'Data & Storage', icon: Database, color: '#336791', description: 'Query relational data.', parameters: { query: 'SELECT * FROM users' } },
  
  // Lead Gen & Search
  { type: 'search-serp', name: 'SerpAPI Search', category: 'Marketing', icon: Search, color: '#4285f4', description: 'Execute advanced Google Search lookups.', parameters: { query: '={{ $json.query }}', location: 'United States' } },
  { type: 'search-linkedin', name: 'LinkedIn Scraper', category: 'Marketing', icon: Globe, color: '#0077b5', description: 'Extract professional profile data.', parameters: { profileUrl: '', depth: 'full' } },
  
  // Document Processing
  { type: 'doc-pdf4me', name: 'PDF Manifest', category: 'Productivity', icon: FileCode, color: '#ef4444', description: 'Generate and convert PDF reports.', parameters: { action: 'convertToPdf', template: 'default' } },
  { type: 'doc-notion', name: 'Notion Node', category: 'Productivity', icon: Layout, color: '#000000', description: 'Interact with Notion workspaces.', parameters: { databaseId: '', action: 'query' } },

  // Messaging & Scheduling
  { type: 'comm-whatsapp', name: 'WhatsApp CRM', category: 'Communication', icon: MessageSquare, color: '#25d366', description: 'Handle business messaging flows.', parameters: { phoneNumber: '', message: '={{ $json.reply }}' } },
  { type: 'comm-cal', name: 'Cal.com Sync', category: 'Communication', icon: Clock, color: '#ffffff', description: 'Manage and sync appointment slots.', parameters: { apiKey: '', action: 'getSlots' } },
  { type: 'data-snowflake', name: 'Snowflake DW', category: 'Data & Storage', icon: Snowflake, color: '#29b5e8', description: 'Cloud data warehouse query.', parameters: { account: '' } },
  { type: 'data-mysql', name: 'MySQL Sync', category: 'Data & Storage', icon: Database, color: '#00758f', description: 'Relational data sync.', parameters: { table: '' } },
  { type: 'data-csv-parse', name: 'CSV Parser', category: 'Data & Storage', icon: FileCode, color: '#6b7280', description: 'Transform CSV to JSON.', parameters: { delimiter: ',' } },
  { type: 'data-json-trans', name: 'Neural JSON', category: 'Data & Storage', icon: Code, color: '#fbbf24', description: 'Manifest complex JSON shapes.', parameters: { map: '=@json' } },

  // Developer Tools
  { type: 'dev-git-push', name: 'Git Commit', category: 'Developer Tools', icon: GitBranch, color: '#f05032', description: 'Automate code commits.', parameters: { message: 'Workflow update' } },
  { type: 'dev-cicd', name: 'CI/CD Trigger', category: 'Developer Tools', icon: Zap, color: '#2088ff', description: 'Release new build versions.', parameters: { pipeline: 'master' } },
  { type: 'dev-logs', name: 'Logs Watcher', category: 'Developer Tools', icon: Terminal, color: '#6366f1', description: 'Alert on error patterns.', parameters: { filter: 'ERROR' } },
  { type: 'dev-debug', name: 'Neural Debug', category: 'Developer Tools', icon: Bug, color: '#ef4444', description: 'Breakpoint logic for flows.', parameters: { condition: 'true' } },
  { type: 'dev-profiler', name: 'Performance', category: 'Developer Tools', icon: Activity, color: '#10b981', description: 'Measure node latency.', parameters: { sample: '10%' } },
  { type: 'dev-api-test', name: 'API Tester', category: 'Developer Tools', icon: Share2, color: '#3b82f6', description: 'Automated endpoint audit.', parameters: { endpoint: '' } },
  { type: 'dev-env-sync', name: 'Env Sync', category: 'Developer Tools', icon: RefreshCw, color: '#f59e0b', description: 'Synchronize .env secrets.', parameters: { environment: 'production' } },
  { type: 'dev-secret', name: 'Secret Store', category: 'Developer Tools', icon: Lock, color: '#8b5cf6', description: 'Access encrypted variables.', parameters: { secretName: '' } },
  { type: 'dev-webhook-sec', name: 'Signed Webhook', category: 'Developer Tools', icon: Shield, color: '#14b8a6', description: 'Verify payloads signature.', parameters: { secret: '' } },
  { type: 'dev-cli', name: 'CLI Executor', category: 'Developer Tools', icon: Terminal, color: '#000000', description: 'Run shell commands safely.', parameters: { command: 'ls -la' } },

  // Development
  { type: 'logic-ts', name: 'Neural Script', category: 'Development', icon: Code, color: '#3178c6', description: 'Run custom TypeScript logic.', parameters: { code: 'return $json;' } },
  { type: 'logic-py', name: 'Python Runner', category: 'Development', icon: Terminal, color: '#3776ab', description: 'Execute external Python scripts.', parameters: { script: '' } },
  { type: 'logic-bash', name: 'Bash Logic', category: 'Development', icon: Terminal, color: '#4eaa25', description: 'Linux shell scripting node.', parameters: { command: '' } },
  { type: 'logic-regex', name: 'Regex Match', category: 'Development', icon: Search, color: '#ec4899', description: 'Extract data via patterns.', parameters: { pattern: '', field: '' } },
  { type: 'logic-http', name: 'HTTP Request', category: 'Development', icon: Globe, color: '#06b6d4', description: 'Universal API client.', parameters: { url: '', method: 'GET', headers: {} } },
  { type: 'logic-merge', name: 'Flow Merge', category: 'Development', icon: GitBranch, color: '#6366f1', description: 'Combine multiple flow branches.', parameters: { mode: 'combine' } },
  { type: 'logic-wait', name: 'Neural Delay', category: 'Development', icon: Clock, color: '#f59e0b', description: 'Pause flow for set time.', parameters: { duration: 1000 } },
  { type: 'logic-switch', name: 'Logic Switch', category: 'Development', icon: GitBranch, color: '#f43f5e', description: 'Route based on conditions.', parameters: { rules: [] } },
  { type: 'logic-foreach', name: 'Array Loop', category: 'Development', icon: RefreshCw, color: '#10b981', description: 'Iterate over data lists.', parameters: { field: 'items' } },
  { type: 'logic-error', name: 'Error Catch', category: 'Development', icon: AlertTriangle, color: '#ef4444', description: 'Handle flow exceptions.', parameters: { retryCount: 3 } },

  // Finance & Accounting
  { type: 'fin-stripe', name: 'Stripe Agent', category: 'Finance & Accounting', icon: Calculator, color: '#635bff', description: 'Process payments/refunds.', parameters: { amount: 0 } },
  { type: 'fin-tax', name: 'Tax Oracle', category: 'Finance & Accounting', icon: Calculator, color: '#f59e0b', description: 'Calculate global sales tax.', parameters: { region: 'US' } },
  { type: 'fin-invoice', name: 'Invoice Gen', category: 'Finance & Accounting', icon: FileCode, color: '#10b981', description: 'Manifest PDF invoices.', parameters: { template: 'classic' } },
  { type: 'fin-portfolio', name: 'Asset Track', category: 'Finance & Accounting', icon: TrendingUp, color: '#3b82f6', description: 'Monitor ROI performance.', parameters: { assets: [] } },
  { type: 'fin-forex', name: 'Forex Engine', category: 'Finance & Accounting', icon: Globe, color: '#06b6d4', description: 'Live currency conversions.', parameters: { from: 'USD', to: 'EUR' } },
  { type: 'fin-ledger', name: 'Ledger Sync', category: 'Finance & Accounting', icon: Database, color: '#8b5cf6', description: 'Double-entry bookkeeping sync.', parameters: { journal: 'general' } },
  { type: 'fin-crypto', name: 'Chain Watch', category: 'Finance & Accounting', icon: Zap, color: '#f7931a', description: 'Monitor wallet movements.', parameters: { chain: 'ethereum' } },
  { type: 'fin-bank', name: 'Bank Link', category: 'Finance & Accounting', icon: Share2, color: '#ec4899', description: 'Sync bank transactions.', parameters: { provider: 'plaid' } },
  { type: 'fin-budget', name: 'Budget Guard', category: 'Finance & Accounting', icon: Shield, color: '#f43f5e', description: 'Alert on spending limits.', parameters: { limit: 5000 } },
  { type: 'fin-report', name: 'P&L Generator', category: 'Finance & Accounting', icon: BarChart, color: '#14b8a6', description: 'Manifest quarterly reports.', parameters: { period: 'Q1' } },

  // HITL
  { type: 'hitl-approve', name: 'Approval Gate', category: 'HITL', icon: UserCheck, color: '#10b981', description: 'Wait for human signature.', parameters: { approvers: [] } },
  { type: 'hitl-feedback', name: 'User Review', category: 'HITL', icon: MessageSquare, color: '#3b82f6', description: 'Gather qualitative feedback.', parameters: { question: '' } },
  { type: 'hitl-prompt', name: 'Human Prompt', category: 'HITL', icon: Zap, color: '#f59e0b', description: 'Ask user for missing data.', parameters: { field: '' } },
  { type: 'hitl-assign', name: 'Task Assign', category: 'HITL', icon: UserCheck, color: '#8b5cf6', description: 'Dispatch task to workspace.', parameters: { assignee: '' } },
  { type: 'hitl-qa', name: 'Quality Audit', category: 'HITL', icon: Shield, color: '#f43f5e', description: 'Manual data verification.', parameters: { threshold: 0.95 } },
  { type: 'hitl-verify', name: 'Account Verify', category: 'HITL', icon: Lock, color: '#14b8a6', description: 'Manual identity verification.', parameters: { method: 'kyc' } },
  { type: 'hitl-annotate', name: 'Data Labeling', category: 'HITL', icon: PenTool, color: '#ec4899', description: 'Assign labels to samples.', parameters: { class: 'images' } },
  { type: 'hitl-escalate', name: 'Critical Alert', category: 'HITL', icon: AlertTriangle, color: '#ef4444', description: 'Route to senior architect.', parameters: { reason: '' } },
  { type: 'hitl-inbox', name: 'Agent Inbox', category: 'HITL', icon: Mail, color: '#6366f1', description: 'Unified human task list.', parameters: { priority: 'high' } },
  { type: 'hitl-review', name: 'Review Cycle', category: 'HITL', icon: RefreshCw, color: '#06b6d4', description: 'Iterative feedback loops.', parameters: { rounds: 1 } },

  // Marketing
  { type: 'mkt-seo', name: 'SEO Auditor', category: 'Marketing', icon: Search, color: '#3b82f6', description: 'Analyze search ranking signals.', parameters: { url: '' } },
  { type: 'mkt-campaign', name: 'Ad Manager', category: 'Marketing', icon: Megaphone, color: '#10b981', description: 'Launch ad sets globally.', parameters: { budget: 100 } },
  { type: 'mkt-social', name: 'Social Pulse', category: 'Marketing', icon: Share2, color: '#8b5cf6', description: 'Auto-post content updates.', parameters: { platform: 'twitter' } },
  { type: 'mkt-lead-score', name: 'Lead Scorer', category: 'Marketing', icon: BarChart, color: '#f59e0b', description: 'Evaluate prospect quality.', parameters: { weight: 'high' } },
  { type: 'mkt-email-seq', name: 'Drip Sequence', category: 'Marketing', icon: Mail, color: '#6366f1', description: 'Manifest marketing journeys.', parameters: { steps: 5 } },
  { type: 'mkt-keyword', name: 'Keyword Engine', category: 'Marketing', icon: Search, color: '#14b8a6', description: 'Extract high-value terms.', parameters: { market: 'tech' } },
  { type: 'mkt-social-post', name: 'Post Scheduler', category: 'Marketing', icon: Clock, color: '#06b6d4', description: 'Buffer social manifestations.', parameters: { time: '9am' } },
  { type: 'mkt-utm', name: 'UTM Generator', category: 'Marketing', icon: Link, color: '#ec4899', description: 'Secure tracking links.', parameters: { source: '' } },
  { type: 'mkt-affiliate', name: 'Affiliate Sync', category: 'Marketing', icon: BarChart, color: '#f43f5e', description: 'Track referral payouts.', parameters: { partnerId: '' } },
  { type: 'mkt-brand', name: 'Brand Sentient', category: 'Marketing', icon: Activity, color: '#d97706', description: 'Monitor brand mentions.', parameters: { keywords: [] } },

  // Productivity
  { type: 'prod-cal', name: 'Calendar Sync', category: 'Productivity', icon: Clock, color: '#3b82f6', description: 'Real-time schedule management.', parameters: { calendar: 'primary' } },
  { type: 'prod-task', name: 'Project Task', category: 'Productivity', icon: CheckCircle2, color: '#10b981', description: 'Manifest new Jira/Asana tasks.', parameters: { project: '' } },
  { type: 'prod-notion', name: 'Notion Sync', category: 'Productivity', icon: Layout, color: '#000000', description: 'Write to Notion databases.', parameters: { pageId: '' } },
  { type: 'prod-doc', name: 'Document Gen', category: 'Productivity', icon: FileCode, color: '#4285f4', description: 'Manifest Google Docs/PDFs.', parameters: { template: '' } },
  { type: 'prod-meeting', name: 'Meeting Notes', category: 'Productivity', icon: MessageSquare, color: '#8b5cf6', description: 'Summarize neural meetings.', parameters: { transcribe: true } },
  { type: 'prod-shortcut', name: 'Neural Trigger', category: 'Productivity', icon: Zap, color: '#f59e0b', description: 'OS-level automation trigger.', parameters: { alias: '' } },
  { type: 'prod-focus', name: 'Focus Guard', category: 'Productivity', icon: Shield, color: '#6366f1', description: 'Silence non-critical signals.', parameters: { duration: 60 } },
  { type: 'prod-priority', name: 'Weighting Logic', category: 'Productivity', icon: BarChart, color: '#f43f5e', description: 'Sort tasks by urgency.', parameters: { algo: 'eisenhower' } },
  { type: 'prod-archive', name: 'Archive Node', category: 'Productivity', icon: HardDrive, color: '#14b8a6', description: 'Cold storage for old data.', parameters: { ttl: '1y' } },
  { type: 'prod-sync', name: 'Global Sync', category: 'Productivity', icon: RefreshCw, color: '#06b6d4', description: 'Synchronize device states.', parameters: { objects: ['settings'] } },

  // Sales
  { type: 'sales-crm', name: 'CRM Manifest', category: 'Sales', icon: UserCheck, color: '#f59e0b', description: 'Update CRM records.', parameters: { stage: 'prospect' } },
  { type: 'sales-pipeline', name: 'Pipe Inspector', category: 'Sales', icon: Search, color: '#8b5cf6', description: 'Monitor deal velocity.', parameters: { minDays: 30 } },
  { type: 'sales-quote', name: 'Digital Quote', category: 'Sales', icon: FileCode, color: '#10b981', description: 'Generate sales proposals.', parameters: { discount: 0 } },
  { type: 'sales-call-log', name: 'Call Registry', category: 'Sales', icon: Activity, color: '#3b82f6', description: 'Log outbound voice interactions.', parameters: { duration: 0 } },
  { type: 'sales-persona', name: 'Lead Persona', category: 'Sales', icon: UserCheck, color: '#ec4899', description: 'Build psychological profiles.', parameters: { traits: [] } },
  { type: 'sales-signal', name: 'Buy Signal', category: 'Sales', icon: Zap, color: '#f43f5e', description: 'Detect intent in behavior.', parameters: { score: 0.8 } },
  { type: 'sales-outreach', name: 'Neural Reach', category: 'Sales', icon: Mail, color: '#6366f1', description: 'Automated sales touchpoints.', parameters: { cadence: 'aggressive' } },
  { type: 'sales-contract', name: 'Contract Hub', category: 'Sales', icon: Lock, color: '#14b8a6', description: 'Secure signature tracking.', parameters: { status: 'draft' } },
  { type: 'sales-renewal', name: 'Churn Guard', category: 'Sales', icon: Shield, color: '#06b6d4', description: 'Detect at-risk accounts.', parameters: { health: 'low' } },
  { type: 'sales-territory', name: 'Geo Map', category: 'Sales', icon: Globe, color: '#d97706', description: 'Assign leads by territory.', parameters: { region: 'EMEA' } },

  // Utility
  { type: 'util-string', name: 'String Master', category: 'Utility', icon: Code, color: '#10b981', description: 'Format and parse strings.', parameters: { operation: 'capitalize' } },
  { type: 'util-date', name: 'Date Engine', category: 'Utility', icon: Clock, color: '#3b82f6', description: 'Timezone and format logic.', parameters: { format: 'ISO' } },
  { type: 'util-math', name: 'Math Logic', category: 'Utility', icon: Calculator, color: '#f59e0b', description: 'Arithmetic calculations.', parameters: { formula: '1 + 1' } },
  { type: 'util-uuid', name: 'UUID Generator', category: 'Utility', icon: Zap, color: '#8b5cf6', description: 'Unique manifestation IDs.', parameters: { version: 'v4' } },
  { type: 'util-hash', name: 'Hash Tool', category: 'Utility', icon: Lock, color: '#6366f1', description: 'Secure data hashing.', parameters: { algo: 'sha256' } },
  { type: 'util-url', name: 'URL Encoder', category: 'Utility', icon: Link, color: '#ec4899', description: 'Manifest clean URLs.', parameters: { decode: false } },
  { type: 'util-base64', name: 'Base64 Tool', category: 'Utility', icon: FileCode, color: '#f43f5e', description: 'Binary string translations.', parameters: { encode: true } },
  { type: 'util-html', name: 'HTML Parser', category: 'Utility', icon: Layout, color: '#14b8a6', description: 'Extract DOM attributes.', parameters: { query: 'div' } },
  { type: 'util-xml', name: 'XML Bridge', category: 'Utility', icon: Code, color: '#06b6d4', description: 'Translate XML to JSON.', parameters: { root: '' } },
  { type: 'util-zip', name: 'Cortex Archiver', category: 'Utility', icon: HardDrive, color: '#d97706', description: 'Zip/Unzip neural payloads.', parameters: { compression: 'best' } },

  // Miscellaneous
  { type: 'misc-feedback', name: 'Feedback Hub', category: 'Miscellaneous', icon: MessageSquare, color: '#10b981', description: 'Collect flow reviews.', parameters: { rating: 5 } },
  { type: 'misc-random', name: 'Entropy Gen', category: 'Miscellaneous', icon: Zap, color: '#3b82f6', description: 'Random value manifestation.', parameters: { min: 0, max: 100 } },
  { type: 'misc-weather', name: 'Weather Feed', category: 'Miscellaneous', icon: Globe, color: '#f59e0b', description: 'Real-time climate data.', parameters: { city: 'London' } },
  { type: 'misc-news', name: 'News Scraper', category: 'Miscellaneous', icon: Search, color: '#8b5cf6', description: 'Trending topic extraction.', parameters: { source: 'google' } },
  { type: 'misc-translate', name: 'Cortex Translate', category: 'Miscellaneous', icon: MessageSquare, color: '#6366f1', description: 'Multi-language translation.', parameters: { targetLang: 'es' } },
  { type: 'misc-timezone', name: 'Zone Shift', category: 'Miscellaneous', icon: Clock, color: '#ec4899', description: 'Calculate local times.', parameters: { zone: 'UTC' } },
  { type: 'misc-unit', name: 'Unit Master', category: 'Miscellaneous', icon: Calculator, color: '#f43f5e', description: 'Metric/Imperial conversion.', parameters: { from: 'm', to: 'ft' } },
  { type: 'misc-qr', name: 'QR Generator', category: 'Miscellaneous', icon: Layout, color: '#000000', description: 'Manifest scannable codes.', parameters: { content: '' } },
  { type: 'misc-palette', name: 'Color Persona', category: 'Miscellaneous', icon: PenTool, color: '#14b8a6', description: 'Extract visual color traits.', parameters: { source: 'image' } },
  { type: 'misc-placeholder', name: 'Logic Stub', category: 'Miscellaneous', icon: Settings, color: '#d97706', description: 'Temporary logic placeholder.', parameters: {} }
];

export const CATEGORIES = [
  'AI', 'Analytics', 'Communication', 'Cybersecurity', 'Data & Storage', 
  'Developer Tools', 'Development', 'Finance & Accounting', 'HITL', 
  'Marketing', 'Productivity', 'Sales', 'Utility', 'Miscellaneous'
];

// Helper to get template by type
export const getTemplateByType = (type: string) => NODE_TEMPLATES.find(t => t.type === type);
