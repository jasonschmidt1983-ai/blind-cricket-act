# Blind Cricket ACT public website

This version follows the owner's explicit choice of GitHub Pages-only hosting. It contains public information and local browser interactions, not an online membership or registration system. There are no personal-data forms, medical uploads, login, private admin, payment entry, database submissions or outbound application API calls. The original brief's transactional/security requirements for those systems are not included in this agreed scope.

## Build and update
Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build:pages`. The final self-contained website is `docs/`; it includes generated HTML for every route, bundled JS/CSS, local fonts, optimised photographs, `CNAME`, `.nojekyll`, `404.html`, sitemap and robots. Public content is in `shared/siteData.ts` and `client/src/pages/Home.tsx`. Do not edit generated docs HTML directly; rebuild after content/source changes and commit the updated docs folder. No GitHub Actions workflow is required.

GitHub Pages should publish from the main branch's `/docs` folder. Public repository source is eligible for GitHub Free; private repository Pages requires an eligible GitHub plan. The platform connects new private repositories, so Pages availability/owner consent to any later repository visibility change must be resolved before enabling publication. GitHub source history is not a private data backup. This site has no user data store.

## Domain setup
The owner purchased blindcricket.com.au through GoDaddy. No GoDaddy hosting is needed. First verify the domain in the GitHub account and configure `blindcricket.com.au` in repository Pages settings. Only after binding the domain should website DNS records be changed to avoid domain takeover risk. Preserve existing email MX and SPF/DKIM/DMARC records; no nameserver change or domain transfer is required.

Current official GitHub apex A values: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. `www` CNAME must point to the confirmed repository owner's `USERNAME.github.io`, without a repository path. GitHub's domain verification TXT value is account-specific and must come from its settings, not be invented. Enable Enforce HTTPS after certificate provision; propagation/certificate readiness may take up to 24 hours. Do not claim the custom domain is live until it resolves to the delivered GitHub Pages build.

Sources: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site and https://www.godaddy.com/help/manage-dns-records-680 .

## Content and accessibility approvals
Current dates, training locations, membership fees, payment/donation links and approved club policies have not been supplied. The site explains how to enquire rather than inventing them. Participation contacts use the verified official Facebook page https://www.facebook.com/blindcricketactofficial/; do not publish medical details or safety complaints on public social feeds. Safety guidance links national integrity information and immediate-danger emergency service 000, without claiming a monitored club reporting channel.

Real photography has been sourced from Cricket ACT and Blind Sports Australia. The club must confirm the right to reuse the images and obtain any participant/media permissions before public launch. Source attribution is not a licence. The website logo is a provisional bespoke cricket/sound mark until the official club logo file is supplied. PACE Farms multicultural-program support comes from the supplied brief; the other linked organisations are wider cricket/inclusion connections, not fabricated direct sponsor endorsements. Brand logos are owned by the respective organisations.

The implementation targets WCAG 2.2 AA with semantic headings/landmarks, alt text, keyboard controls, skip link, focus states, accessible dialog labels, reduced motion, contrast, zoom/reflow and no autoplay. A manual accessibility audit using NVDA, JAWS, VoiceOver and TalkBack remains necessary before claiming conformance. Local preferences store only text-size/contrast choices. GitHub Pages may log visitors' IP addresses independently of this site; see GitHub's privacy statement.

## Hosting independence
The build is static and makes no calls to Manus backend, OAuth or database services. Manus previously provisioned project capabilities before the owner changed the scope; these capabilities are unused, cannot be disabled through the current API, and are not a dependency of GitHub Pages. No Stripe integration is enabled. Do not provision a paid server as a workaround for this owner's GitHub-only decision.
