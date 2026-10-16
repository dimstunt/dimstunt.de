# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML + one CSS file, no build step, hosted on GitHub Pages (custom domain dimstunt.de, DNS on Cloudflare, not proxied). Cloudflare Web Analytics beacon on every page.

## Users

- Recruiters and hiring managers skimming for 20–60 seconds: who is this, what does he do now, how senior, how to contact, where is the CV.
- Engineering peers (data engineers, homelab and Claude Code people) who want the person behind the work: stack, side projects, taste.

## Product Purpose

Personal site and CV of Dmitrii Cherkashin (handle: dimstunt), a data engineer. Success: a visitor knows within seconds that he builds data platforms (currently a lakehouse at Welltory), remembers the site, and either opens the CV or reaches out.

## Positioning

Nine years of data platforms (Tinkoff, Mail.ru Group, Citymobil, Agro.club, Anabar, Welltory) told by someone with a personality: data engineer and snowboarder, self-hoster, builds his own AI tooling.

## Capabilities and Constraints

- Pages: `/` (landing with projects and contacts), `/cv/` (full CV) with a static PDF at `/cv/dmitrii-cherkashin-cv.pdf` (regenerate when the CV changes), and `404.html`.
- English only. No blog.
- CV must print as a clean, sober A4 document (2 pages).
- Side-project repos are private and never linked; project cards carry no links.
- Publish only what Evidence on Hand and Brand Commitments list; nothing else about employers, contacts or private life.

## Brand Commitments

- Name: Dmitrii Cherkashin; handle dimstunt; tagline "data engineer · snowboarder".
- Location: Montevideo, Uruguay · remote.
- Availability: employed at Welltory, open to freelance projects.
- Contacts (all public): mit.cherkashin@gmail.com, t.me/dimstunt, linkedin.com/in/dimstunt, github.com/dimstunt, instagram.com/dimstunt.

## Evidence on Hand

- Welltory (01/2025–now): built a data lakehouse on AWS from scratch (S3 + Iceberg, Glue, Athena, Airflow); CDC from Postgres and DynamoDB via Kafka; OpenMetadata; Lake Formation tags (PII/PHI); GDPR pipelines. Forked and maintains an abandoned open-source Kafka Connect DynamoDB Streams connector (12 tables, 300+ shards), cut its checkpoint write load ~5.7× with zero throttling; scaled CDC through an 80× data-volume surge; retired the legacy data lake.
- Anabar: processing 17h → 7h (SLA 70% → 95%), −40% ClickHouse storage, p90 20s → <1s.
- Agro.club: built and led the DWH team from scratch; reports 1.5h → 1–2 min.
- Side projects: Vox (macOS meeting recorder, local transcription and diarization, Swift 6), dima-lab (home server: Docker, Home Assistant, Grafana, Caddy, Tailscale, AI agent), dimstunt-plugins (Claude Code plugins and skills).
- Degree in Mathematical Physics, Lomonosov Moscow State University (2018).
- No testimonials, logos or press — do not invent any.

## Product Principles

1. A recruiter gets who / what / how senior / how to reach within 20 seconds, whatever the visual world.
2. Real numbers over technology lists.
3. Personality is allowed to be loud; facts stay exact.
4. Nothing private leaks for the sake of a joke.

## Accessibility & Inclusion

Text contrast at WCAG AA, motion off under `prefers-reduced-motion`, works from 320px wide.
