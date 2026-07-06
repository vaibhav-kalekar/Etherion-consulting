---
title: "Data Governance at Scale: Building Compliance Infrastructure for Insurance"
date: 2026-02-20
author: "Etherion Consulting"
description: "How a multinational insurance group implemented ISO 42001-aligned data governance across 12 countries and 500+ data sources."
categories: ["Case Study"]
tags: ["insurance", "data-governance", "iso-42001", "compliance", "cpg-235"]
featured_image: "/images/blog/blog-2.jpg"
---

{{< toc >}}

## Executive Summary

A top-10 global insurance group faced critical data governance challenges:
- Fragmented data governance across 12 countries with inconsistent standards
- 500+ unmanaged data sources with no lineage or ownership
- CPG 235 compliance gaps putting them at regulatory risk
- Data quality issues impacting actuarial models and pricing accuracy

We implemented a global, scalable data governance operating model that delivered:
- **100% CPG 235 compliance** in 18 months
- **95% data source registration** and documentation
- **$8M annual savings** from improved data quality and reduced manual controls
- **60% faster** regulatory reporting and audit cycles

## The Challenge

The insurance group operated as a federation of regional businesses with minimal central governance:

### Governance Landscape
- 12 regional data governance offices with different standards
- No enterprise data dictionary or metadata repository
- Manual data quality processes requiring 50+ FTE annually
- 300+ active regulatory inquiries annually related to data management
- Inconsistent approach to data access controls and privacy

### Regulatory Risk
- CPG 235 (APRA guidance on prudential data management) requiring comprehensive data governance
- Growing GDPR complexity across European operations
- Increasing regulatory scrutiny of actuarial data quality
- Audit findings accumulating year-over-year

### Business Impact
- Pricing models challenged for accuracy by regulators
- Merger & acquisition activities delayed due to data quality concerns
- Digital initiatives hampered by inability to reliably access clean data
- 3+ weeks of manual effort for monthly regulatory reporting

## Our Approach

### Phase 1: Discovery & Design (Months 1-3)
Comprehensive assessment of current state and design of target governance model:

**Current State Assessment:**
- Conducted interviews with 50+ stakeholders across regions
- Catalogued 500+ data sources and their characteristics
- Mapped data flows and identified quality hotspots
- Assessed regulatory compliance gaps against CPG 235

**Target State Design:**
- ISO 42001 and DAMA-DMBOK aligned governance operating model
- Centralized metadata repository with distributed governance
- Data governance council structure spanning regions
- Clear data ownership, stewardship, and accountability model

**Key Finding:** 70% of regulatory reporting data had no documented lineage or validation rules.

### Phase 2: Governance Operating Model (Months 4-6)
Established the organizational and process foundation:

**Governance Structure:**
- Enterprise Data Governance Council with executive representation
- 12 regional data governance committees
- Functional data stewards for core domains (actuarial, claims, customer)
- Data quality working groups by business function

**Policies & Standards:**
- Master data governance policy covering all regions
- Data classification and handling standards aligned with privacy regulations
- Data quality standards and acceptable thresholds by domain
- Data access and security standards across jurisdictions

**Tools & Infrastructure:**
- Implemented Alation for metadata management and data lineage
- Built data quality monitoring with Great Expectations
- Created data governance dashboard for council visibility
- Established data governance request and approval workflow in ServiceNow

### Phase 3: Data Cataloguing & Lineage (Months 7-12)
Comprehensive documentation of enterprise data landscape:

**Data Source Inventory:**
- 500+ data sources mapped and categorized
- Data lineage established from source through to reporting
- Data dictionary created for all critical data domains
- Metadata enriched with ownership, quality metrics, and usage

**Data Quality Baseline:**
- Quality assessment against standards for each data source
- Quality issues prioritized by business impact and regulatory risk
- Quality improvement plans developed for high-risk areas
- Automated quality monitoring implemented

**Regulatory Alignment:**
- Mapped all CPG 235 requirements to specific data governance controls
- Created compliance evidence repository
- Established audit trail for all data governance decisions
- Prepared comprehensive governance documentation for regulatory submission

### Phase 4: Implementation & Automation (Months 13-18)
Operationalized governance at scale:

**Process Automation:**
- Automated data quality checks at source systems
- Real-time alerts for data quality anomalies
- Automated lineage tracking using data tagging
- Governance workflow automation for approvals

**Capability Building:**
- Data stewardship training for 100+ staff across regions
- Data quality management workshops for 50+ technical staff
- Governance operating model training for executives (25+ leaders)
- Regional data governance coordinators trained and empowered

**Continuous Improvement:**
- Monthly governance council meetings tracking metrics
- Quarterly governance effectiveness assessments
- Data governance community of practice established
- Regular updates to standards based on lessons learned

## Technology Stack

- **Metadata Management:** Alation (Data Lake & Lineage)
- **Data Quality:** Great Expectations, Soda
- **Data Governance Tools:** Collibra, ServiceNow
- **Monitoring:** Datadog, custom dashboards
- **Data Warehouse:** Snowflake
- **BI Platform:** Tableau with governed data access

## Results & Outcomes

### Governance Outcomes
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Data Sources Catalogued | 60% | 95% | **+35pp** |
| Data Lineage Coverage | 10% | 85% | **+75pp** |
| CPG 235 Compliance | 45% | 100% | **+55pp** |
| Data Governance Maturity | Level 1 | Level 3 | **2 levels** |

### Operational Outcomes
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Regulatory Reporting Time | 3+ weeks | 3 days | **90% reduction** |
| Audit Preparation Time | 4-6 weeks | 5 days | **85% reduction** |
| Data Quality Issues (critical) | 45/month | 3/month | **93% reduction** |
| Manual Data Verification | 50 FTE | 15 FTE | **70% reduction** |

### Financial Outcomes
- **Cost Savings:** $8M annually from reduced manual controls and improved efficiency
- **Risk Reduction:** $2M+ avoided regulatory penalties through proactive CPG 235 compliance
- **Revenue Impact:** $12M from improved pricing accuracy enabled by trusted data

### Compliance Outcomes
- **100% CPG 235 compliance** verified in external audit
- **Zero audit findings** on data management in last regulatory examination
- **Zero data privacy incidents** in GDPR-regulated regions
- **Regulatory confidence:** Reduced inquiry volume by 60%

## Key Success Factors

1. **Executive Commitment:** CFO and CRO co-sponsored governance transformation
2. **Phased Rollout:** Regional pilots before global rollout reduced implementation risk
3. **Governance First:** Process and standards established before tool implementation
4. **Capability Investment:** 200+ staff trained on governance and tools
5. **Regulatory Proactivity:** Continuous communication with APRA and other regulators

## Implementation Timeline

```
Month 1-3: Discovery & Design
Month 4-6: Operating Model & Policies
Month 7-9: Data Cataloguing (Phase 1)
Month 10-12: Data Cataloguing (Phase 2) + Automation
Month 13-15: Regional Rollout & Capability
Month 16-18: Stabilization & Continuous Improvement
```

## Lessons Learned

### What Worked Well
- Starting with operating model and policies before tools prevented technology-led failures
- Regional pilot with strong executive sponsor accelerated adoption
- Clear ownership and accountability made governance "sticky"
- Automated quality checks achieved scale without proportional cost

### Challenges & Solutions
- **Challenge:** Resistance from regional offices wanting to maintain autonomy
  - **Solution:** Balanced central governance with local execution; regional data stewards retained authority over local implementation

- **Challenge:** Legacy systems without modern APIs for metadata extraction
  - **Solution:** Built custom adapters and manual processes for legacy systems, automated where possible

- **Challenge:** Competing definitions of key business terms
  - **Solution:** Business glossary workshops mediated by neutral facilitator; version control for definitions

## Industry Benchmarking

The insurance group's governance maturity now exceeds industry norms:
- **Data Source Coverage:** 95% vs 60% industry average
- **CPG 235 Compliance:** 100% vs 70% industry average
- **Regulatory Audit Findings:** 0 vs 3-4 per exam industry average
- **Data-Driven Decision Making:** 65% of decisions vs 40% industry average

## Recommendations for Financial Services

1. **Start with governance, not technology.** Clear policies and standards are more important than tool selection.

2. **Balance centralization with distribution.** Enterprise standards with regional flexibility ensures adoption and relevance.

3. **Automate quality monitoring.** Manual data quality is unscalable; invest in automated checks and alerts.

4. **Measure governance value.** Connect data governance improvements to business outcomes (cost, risk, revenue).

5. **Build sustainable capability.** Train and empower internal teams rather than creating consulting dependency.

## Conclusion

This transformation demonstrates that global data governance is achievable—even with legacy systems, multiple jurisdictions, and complex regulatory requirements. By establishing clear governance foundations, investing in capability, and taking a phased approach, the insurance group moved from reactive compliance to proactive data stewardship.

The result: a trusted, governed data ecosystem that powers better decisions, reduces risk, and exceeds regulatory expectations.

---

**Client:** Top-10 Global Insurance Group  
**Duration:** 18 months  
**Geographic Scope:** 12 countries, 500+ data sources  
**Team Size:** 8 Etherion staff + 30+ client governance staff  
**Key Frameworks:** ISO 42001, DAMA-DMBOK, CPG 235  
**Outcome:** 100% compliance + $8M annual savings
