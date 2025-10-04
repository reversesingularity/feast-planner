The 6-Month Solo Launch Plan
Month 1: Infrastructure & Core Framework
Goal: Working authentication + empty app shell
Week 1-2: Setup

AWS account configuration (Cognito, Lambda, DynamoDB, S3)
SvelteKit project scaffold with Tailwind
Deploy "hello world" to a staging environment
Set up GitHub repo with basic CI/CD

Week 3-4: Authentication Flow

Cognito integration (register, login, password reset)
Protected route handling
Basic user profile page
Test with 2-3 friends to verify auth works

Deliverable: You can create an account and log in. Nothing else works yet.
Time estimate: 60 hours (15 hrs/week)

Month 2: Data Foundation + Map Display
Goal: Users can see Feast sites on a map
Week 1-2: Database Schema + Manual Entry

Create DynamoDB tables (FeastSites, ChurchOrgs, Users)
Build admin panel for entering site data (just for you)
Manually enter COGWA sites first (10-12 sites)
Add basic validation and data structure

Week 3-4: Map Interface

Google Maps integration
Display site pins from database
Click pin → show basic info card
Mobile-responsive map view

Deliverable: A map showing 10-12 COGWA Feast sites with basic info.
Time estimate: 60 hours
Data work: ~12 hours to research and enter 10-12 COGWA sites properly

Month 3: Site Detail Pages + Search
Goal: Rich site information + discovery features
Week 1-2: Site Detail Pages

Template for displaying full site information
Schedule display (services, activities)
Hotel information section
Contact details
"Add to My Trip" button (even if it doesn't work yet)

Week 3-4: Search & Filtering

Search by location name
Filter by church organization (COGWA/UCG toggle)
Filter by year (2025, 2026)
Filter by country/region

Deliverable: Users can find sites and see comprehensive details.
Time estimate: 60 hours
Data work: Expand to 20 total sites (add 8-10 UCG sites) - ~10 hours

Month 4: Trip Planning Core
Goal: Users can create and manage a trip itinerary
Week 1-2: Trip Creation

"Create New Trip" flow
Select destination Feast site
Trip automatically populated with official service schedule
Trip dashboard showing upcoming events in chronological order

Week 3-4: Manual Itinerary Items

Add flight (form with: airline, flight #, date/time, confirmation #)
Add hotel (form with: name, check-in/out, confirmation #, address)
Add custom event (form with: title, date/time, notes)
Edit/delete itinerary items
Chronological display of all items

Deliverable: Complete trip planning workflow. This is your functional MVP.
Time estimate: 60 hours

Month 5: Polish, Offline, & Beta Testing
Goal: Make it actually good and get real user feedback
Week 1: Offline Capability

Implement service worker for PWA
Cache user's current trip for offline viewing
"Install to Home Screen" prompt on mobile
Test thoroughly without network connection

Week 2: UI/UX Polish

Refine mobile navigation
Add loading states and error handling
Improve visual design consistency
Add helpful empty states ("You haven't added any trips yet")

Week 3-4: Private Beta

Invite 10-15 community members
Create feedback form/channel
Monitor usage (basic analytics)
Fix critical bugs
Watch how people actually use it

Deliverable: Polished app tested by real users.
Time estimate: 60 hours
Critical: Actually watch people use it. You'll learn things your blueprint didn't predict.

Month 6: Public Launch Prep + Marketing
Goal: Go public and get your first 100 users
Week 1-2: Launch Readiness

Fix all beta tester feedback
Write basic help documentation (FAQ page)
Set up support email or contact form
Add a simple landing page explaining what it is
Final security audit (basic checks)

Week 3-4: Soft Launch

Post in COGWA member forums/groups (if allowed)
Post in UCG forums/groups
Email announcement to beta testers asking them to share
Monitor for bug reports
Respond to questions quickly

Deliverable: Public application with 50-100 registered users (realistic goal).
Time estimate: 60 hours

What You'll Have After 6 Months
Working Application:

20+ Feast sites (COGWA + UCG primarily)
User authentication
Interactive map discovery
Detailed site pages with schedules
Trip planning with automatic schedule population
Manual itinerary items (flights, hotels, custom)
Offline access via PWA
Mobile-optimized experience

What You Won't Have (and that's okay):

❌ Budgeting/expense tracking (Phase 2)
❌ Group expense splitting (Phase 2)
❌ Itinerary sharing (Phase 2)
❌ Email parsing (Phase 3)
❌ Flight/hotel booking integrations (Phase 3)
❌ Sites from smaller church organizations (add based on demand)


Key Success Factors for Solo Development
1. Ruthless Scope Control
When you're coding and think "it would be cool to add X"—don't. Write it in a "Phase 2 Ideas" document and move on. Feature creep kills solo projects.
2. Weekly Progress Ritual
Every Sunday, spend 30 minutes:

What did I ship this week?
What's blocking me?
What's the ONE thing I'll finish next week?

This prevents drifting and keeps momentum.
3. Code Quality vs. Shipping
You're building an MVP, not selling to enterprises. Prioritize:

✅ Works correctly for the happy path
✅ Doesn't lose user data
✅ Handles errors gracefully
❌ 100% test coverage (nice-to-have, not required)
❌ Perfect code architecture (you can refactor later)

4. Data Operations System
Create a simple spreadsheet NOW:

Column 1: Feast Site Name
Column 2: Church Org
Column 3: Source URL
Column 4: Last Verified Date
Column 5: Next Check Date

Set calendar reminders to review this monthly. Data staleness will kill user trust faster than any bug.
5. Community Engagement Strategy
You have insider access—use it wisely:
Good approaches:

"Hey everyone, I built a tool to help plan Feast attendance. Looking for 5-10 people to test it out."
Post in "Feast planning" discussion threads with genuine helpfulness
Offer it as a free resource, no strings attached

Avoid:

Spamming every group
Overselling before it's proven
Asking for money before you have 500+ active users

6. Burnout Prevention
At 15 hours/week, you'll have weeks where you can't code at all. That's fine. Build in buffer:

Some weeks you'll do 5 hours
Some weeks you'll do 25 hours
It averages out

The key is: don't quit. Even 5 hours/week of consistent progress beats 30 hours one week then nothing for a month.

Technical Shortcuts to Save Time
Use These Liberally (They're Not "Cheating")

Tailwind UI Components (paid, $149)

Pre-built component examples
Will save you 20+ hours of UI development
Professional look without design skills


DaisyUI (free)

Tailwind component library
Good alternative if you don't want to pay


AWS Amplify (consider it)

Can replace manual Cognito setup
Generates auth UI automatically
Might save 10-15 hours in Month 1


Google Maps API Free Tier

$200/month free credit
More than enough for MVP (covers ~28,000 map loads/month)
Only pay if you get significant traction


Supabase (alternative to AWS)

Postgres database + auth + file storage
Simpler than AWS for solo devs
Free tier is generous
Consider this if AWS feels overwhelming



Don't Build These (Yet)

❌ Custom admin panel → Use AWS Console or Supabase Studio
❌ Analytics dashboard → Use Google Analytics (free)
❌ Email service → Use AWS SES or SendGrid free tier
❌ Image optimization → Use Cloudinary free tier
❌ Custom error tracking → Use Sentry free tier


Budget Reality Check
Estimated costs for first 6 months:
ServiceMonthly Cost6-Month TotalAWS (Lambda, DynamoDB, Cognito)$5-15$30-90Domain name (feastplanner.app)-$12/yearGoogle Maps API$0 (free tier)$0Tailwind UI (optional)-$149 one-timeSSL Certificate$0 (AWS/Let's Encrypt)$0Total$42-251
This is incredibly affordable for a production web app. Your main investment is time, not money.

The "Oh Shit" Contingency Plan
What if you get stuck and lose momentum?
Common Sticking Points & Solutions:
"AWS is confusing and I can't get auth working"
→ Switch to Supabase. Seriously. It's simpler. You'll lose a week migrating but save 20 hours of fighting AWS documentation.
"The map integration is harder than I thought"
→ Use a simpler library (Leaflet + OpenStreetMap) instead of Google Maps. It's free and easier, just less polished.
"I can't get the offline PWA working"
→ Ship without it for launch. Add it in Month 7. Users can use the app online first.
"I'm in Month 4 and haven't written a line of code"
→ Reassess. Are you actually committed? If yes, extend the timeline. If no, that's okay—not every project needs to ship.
"Users are asking for features I didn't plan"
→ This is good news. It means they care. Add requested features to a public roadmap/voting board. Build the most-requested one.

Post-Launch Decision Tree (Month 7)
After your soft launch, evaluate:
Scenario A: 50+ Active Users

You've validated demand
Continue to Phase 2 (budgeting module)
Consider adding more church orgs (CGI, LCG)
Maybe start thinking about sustainability (donations? premium features?)

Scenario B: 10-20 Active Users

Niche but engaged audience
Maintain the app, add sites annually
Don't invest heavily in new features
Open-source it so the community can contribute

Scenario C: <10 Users

Honest assessment: is it a distribution problem or a product problem?
If distribution: try different channels
If product: get direct feedback on why people didn't use it
Consider pivoting or archiving


Your Unfair Advantages (Don't Underestimate These)

Domain Expertise: You know the Feast schedule, the terminology, the user pain points
Network Access: You can reach users without buying ads
Data Access: You have legitimate sources for accurate information
Timing: You can launch 6-8 months before the 2025 Feast when people start planning
Trust: Community members are more likely to try a tool built by someone "in the family"

These advantages matter more than technical skill. Many technically superior apps fail because they lack these.

My Recommendation: Start This Weekend
Weekend 0 (Before Month 1 officially starts):

Set up AWS account
Create GitHub repo
Initialize SvelteKit project
Deploy "Hello World" to AWS Amplify or Vercel
Goal: See something live on the internet, even if it's just "Coming Soon"

This creates psychological momentum. Once you've deployed something, continuing feels easier than starting.

Final Thoughts
This is absolutely doable. You have:

✅ Realistic time commitment (15 hrs/week)
✅ Domain expertise
✅ User access
✅ Technical clarity (good blueprint)
✅ Scoped MVP (after our descoping)

The main risk isn't technical—it's consistency. Can you code 15 hours/week for 26 weeks? If yes, you'll ship something valuable.
One more thing: Don't wait for perfection. The app in Month 6 will be rough around the edges. Ship it anyway. You'll learn more from 50 real users than from 3 more months of solo development.