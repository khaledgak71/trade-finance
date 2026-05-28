export const MODULE_CONTENT: Record<string, { lessons: { slug: string; title: string; content: string; infographic_key?: string; duration_mins: number }[]; quiz: { question_text: string; options: { key: string; text: string }[]; correct_key: string; explanation: string }[] }> = {
  'introduction': {
    lessons: [
      {
        slug: 'what-is-trade-finance',
        title: 'What is Trade Finance?',
        duration_mins: 7,
        infographic_key: 'TradeFinanceOverview',
        content: `## What is Trade Finance?

**Trade finance** refers to the financial instruments, products, and services that banks and other institutions provide to facilitate international and domestic trade transactions. It bridges the gap between the moment goods are shipped and the moment payment is received — eliminating the trust barrier that exists between buyers and sellers across borders.

### The Core Problem

International trade creates a fundamental dilemma:

> **The Seller** wants to be paid before — or at the time of — shipping goods.
> **The Buyer** wants to receive the goods before paying.

Neither party knows the other well. They may be in different countries, subject to different laws, speaking different languages, operating in different time zones. Without a mechanism to bridge this trust gap, global commerce would grind to a halt.

### How Trade Finance Solves This

Banks step in as trusted intermediaries. Through instruments like **Letters of Credit**, **Documentary Collections**, and **Bank Guarantees**, banks provide:

| Benefit | For the Seller | For the Buyer |
|---------|----------------|---------------|
| **Payment Assurance** | Bank guarantees payment on complying documents | Payment only released when correct documents provided |
| **Financing** | Access to pre-shipment and post-shipment finance | Extended payment terms |
| **Risk Mitigation** | Protection from buyer default | Protection from seller non-performance |
| **Document Control** | Structured document requirements | Proof of shipment before payment |

### The Scale of Trade Finance

- Global trade finance market: **~$10 trillion** per year
- Approximately **80–90%** of world trade relies on some form of trade finance
- The ICC (International Chamber of Commerce) governs the key rulebooks used globally

### Three Core Flows in Every Trade Transaction

Every international trade deal involves three simultaneous flows:

1. **Goods Flow** — Physical movement of products from seller's country to buyer's country
2. **Document Flow** — Commercial invoice, bill of lading, packing list, certificates, and more pass through banks
3. **Payment Flow** — Funds move from buyer → buyer's bank → seller's bank → seller

Study the infographic above carefully — it maps all three flows across the four key parties in every trade finance transaction.`,
      },
      {
        slug: 'key-parties',
        title: 'Key Parties in a Trade Transaction',
        duration_mins: 6,
        content: `## Key Parties in a Trade Transaction

Understanding who the key players are — and what each one wants — is the foundation of trade finance.

### The Four Core Parties

#### 1. The Exporter (Seller / Beneficiary)
The party that produces or supplies goods and services. The exporter:
- Bears the risk of shipping goods without guaranteed payment
- Wants a **bank payment guarantee** before committing to production or shipment
- Is called the **Beneficiary** in Letters of Credit (benefits from the LC)
- Is called the **Principal** in some guarantee structures

#### 2. The Importer (Buyer / Applicant)
The party purchasing goods from a foreign seller. The importer:
- Bears the risk of paying before receiving correct goods
- Wants proof of shipment and document compliance before funds are released
- Is called the **Applicant** in Letters of Credit (applies for the LC)
- Opens the LC through their own bank

#### 3. The Issuing Bank (Importer's Bank)
The bank that acts on the importer's behalf. The issuing bank:
- Issues Letters of Credit, guarantees, and other instruments
- Takes on the credit risk of the importer
- Is responsible for paying the exporter upon compliant document presentation
- Communicates with the advising bank via **SWIFT messages** (e.g., MT700 for LCs, MT760 for guarantees)

#### 4. The Advising Bank (Exporter's Bank)
The bank in the exporter's country. The advising bank:
- Receives and authenticates instruments from the issuing bank
- Advises (notifies) the exporter of the LC or guarantee
- May also act as the **Confirming Bank** — adding its own payment undertaking, which eliminates issuing bank risk for the exporter
- Handles document examination and forwarding

### Additional Parties

| Party | Role |
|-------|------|
| **Confirming Bank** | Adds its own payment guarantee to an LC — protects seller from issuing bank/country risk |
| **Nominated Bank** | Bank authorized to pay, accept drafts, or negotiate under an LC |
| **Freight Forwarder** | Arranges shipping; produces the Bill of Lading |
| **Insurance Company** | Issues marine/cargo insurance certificates required in many LCs |
| **Customs / Port Authorities** | Issue certificates of origin, inspection certificates |

### What Each Party Fears

| Party | Primary Fear |
|-------|-------------|
| Exporter | Shipping goods and not getting paid |
| Importer | Paying and receiving wrong / no goods |
| Issuing Bank | Importer defaulting on reimbursement |
| Advising Bank | Issuing bank defaulting on payment |

Trade finance instruments are designed to address each of these fears simultaneously.`,
      },
      {
        slug: 'instruments-overview',
        title: 'Overview of Trade Finance Instruments',
        duration_mins: 8,
        content: `## Overview of Trade Finance Instruments

Trade finance offers a spectrum of instruments, each balancing risk, cost, and complexity differently. Choosing the right instrument depends on the relationship between buyer and seller, the countries involved, and the transaction size.

### The Risk Spectrum

\`\`\`
Seller carries more risk ◄─────────────────────────────────► Buyer carries more risk
        │                                                              │
  Open Account    Documentary      Letters of     Bank         Cash in
                  Collections       Credit       Guarantees    Advance
\`\`\`

### 1. Open Account
- **How it works**: Seller ships goods and invoices the buyer; payment comes later (30, 60, 90 days)
- **Risk**: Entirely on the seller — buyer could default or delay
- **When used**: Established relationships, intra-company trade, trusted partners
- **Cost**: Very low (no bank fees)

### 2. Documentary Collections (URC 522)
- **How it works**: Seller's bank sends documents to buyer's bank; buyer pays or accepts a draft to receive the documents
- **Types**: **D/P** (Documents against Payment — sight) and **D/A** (Documents against Acceptance — deferred)
- **Risk**: Bank handles documents but does NOT guarantee payment
- **When used**: Reasonable trust exists; seller wants more control than open account
- **Cost**: Low to moderate

### 3. Letters of Credit — LC (UCP 600)
- **How it works**: Issuing bank guarantees payment to seller if compliant documents are presented by the expiry date
- **Risk**: Balanced — bank's credit replaces buyer's credit
- **When used**: New relationships, large transactions, high-risk countries
- **Cost**: Moderate to high (LC fees, amendment fees, confirmation fees)
- **Key rule**: Banks deal in **documents**, not goods

### 4. Bank Guarantees (URDG 758)
- **How it works**: Bank issues an independent undertaking to pay a third party if the applicant fails to perform
- **Types**: Performance Bond, Advance Payment Guarantee, Bid Bond, Retention Bond
- **Risk**: Contingent — called only upon non-performance or default
- **When used**: Construction contracts, service contracts, government tenders
- **Cost**: Annual guarantee fee (typically 0.5–2% per annum)

### 5. Supply Chain Finance (SCF)
- **How it works**: Buyer-led programs that allow suppliers to receive early payment on approved invoices
- **Types**: Reverse Factoring, Receivables Purchase, Dynamic Discounting
- **Risk**: Low — based on buyer's credit rating, not supplier's
- **When used**: Large corporates with strong credit supporting their supply chains
- **Cost**: Based on buyer's cost of capital

### Choosing the Right Instrument

| Scenario | Recommended Instrument |
|----------|----------------------|
| First-time buyer, unknown country | Confirmed Letter of Credit |
| Repeat buyer, moderate trust | Documentary Collection (D/P) |
| Long-term partner | Open Account + SCF |
| Construction/services contract | Bank Guarantee (Performance Bond) |
| Government tender | Bid Bond |
| Working capital needed by seller | Invoice Discounting / Factoring |`,
      },
    ],
    quiz: [
      {
        question_text: 'What is the fundamental problem that trade finance solves?',
        options: [
          { key: 'a', text: 'Currency exchange between different countries' },
          { key: 'b', text: 'The trust gap where the seller wants payment before shipping but the buyer wants goods before paying' },
          { key: 'c', text: 'Calculating import duties and taxes' },
          { key: 'd', text: 'Arranging freight and logistics for shipments' },
        ],
        correct_key: 'b',
        explanation: 'Trade finance exists to bridge the trust gap in international trade: sellers fear non-payment while buyers fear non-delivery. Banks act as trusted intermediaries providing guarantees to both sides.',
      },
      {
        question_text: 'Which party is called the "Beneficiary" in a Letter of Credit?',
        options: [
          { key: 'a', text: 'The importer (buyer)' },
          { key: 'b', text: 'The issuing bank' },
          { key: 'c', text: 'The exporter (seller)' },
          { key: 'd', text: 'The freight forwarder' },
        ],
        correct_key: 'c',
        explanation: 'The exporter (seller) is called the Beneficiary because they benefit from the bank\'s payment guarantee. The importer is the Applicant who applies for the LC.',
      },
      {
        question_text: 'In the trade finance risk spectrum, which instrument carries the MOST risk for the seller?',
        options: [
          { key: 'a', text: 'Letter of Credit' },
          { key: 'b', text: 'Cash in Advance' },
          { key: 'c', text: 'Open Account' },
          { key: 'd', text: 'Documentary Collection D/P' },
        ],
        correct_key: 'c',
        explanation: 'Open Account carries the most risk for the seller — goods are shipped before payment, with no bank guarantee. The seller relies entirely on the buyer\'s willingness and ability to pay.',
      },
      {
        question_text: 'What is the role of the Issuing Bank in international trade?',
        options: [
          { key: 'a', text: 'It ships goods on behalf of the seller' },
          { key: 'b', text: 'It issues instruments (like LCs and guarantees) on behalf of the importer and guarantees payment on compliant documents' },
          { key: 'c', text: 'It provides credit to the exporter directly' },
          { key: 'd', text: 'It inspects goods at the port of loading' },
        ],
        correct_key: 'b',
        explanation: 'The Issuing Bank acts on the importer\'s behalf — it issues Letters of Credit and Bank Guarantees, taking on the payment obligation and substituting its own credit for the buyer\'s credit.',
      },
      {
        question_text: 'Which trade finance instrument is governed by URDG 758?',
        options: [
          { key: 'a', text: 'Letters of Credit' },
          { key: 'b', text: 'Documentary Collections' },
          { key: 'c', text: 'Bank Guarantees (Demand Guarantees)' },
          { key: 'd', text: 'Supply Chain Finance' },
        ],
        correct_key: 'c',
        explanation: 'URDG 758 (Uniform Rules for Demand Guarantees, ICC Publication No. 758) governs demand bank guarantees. Letters of Credit are governed by UCP 600, and Documentary Collections by URC 522.',
      },
    ],
  },
  'letters-of-credit': {
    lessons: [
      {
        slug: 'what-is-lc',
        title: 'What is a Letter of Credit?',
        duration_mins: 8,
        content: `## What is a Letter of Credit?

A **Letter of Credit (LC)** is a written undertaking issued by a bank (the issuing bank) on behalf of a buyer (the applicant), promising to pay a seller (the beneficiary) a specified sum of money, provided the seller presents documents that comply strictly with the terms of the LC.

### Key Parties

| Party | Role |
|-------|------|
| **Applicant** | The buyer/importer who requests the LC |
| **Issuing Bank** | The buyer's bank that issues the LC |
| **Beneficiary** | The seller/exporter who receives payment |
| **Advising Bank** | The seller's bank that authenticates and advises the LC |
| **Confirming Bank** | An additional bank (often the advising bank) that adds its own payment undertaking |

### Why Use an LC?

Letters of Credit solve the fundamental problem of trust in international trade: the buyer fears paying before receiving goods, while the seller fears shipping goods before receiving payment. The LC places a bank's credit between both parties.

### Core Principle: Document Compliance

Banks deal in **documents, not goods**. Payment is triggered by the presentation of conforming documents — not by the physical delivery of goods. This is the bedrock principle established in **UCP 600** (Uniform Customs and Practice for Documentary Credits, ICC Publication No. 600).

> "Banks examine a presentation to determine, on the basis of the documents alone, whether or not the documents appear on their face to constitute a complying presentation." — UCP 600, Article 14`,
      },
      {
        slug: 'types-of-lc',
        title: 'Types of Letters of Credit',
        duration_mins: 10,
        content: `## Types of Letters of Credit

### By Revocability
- **Irrevocable LC**: Cannot be amended or cancelled without the consent of all parties. Under UCP 600, ALL letters of credit are irrevocable unless explicitly stated otherwise.
- **Revocable LC**: Can be amended or cancelled by the issuing bank at any time without prior notice — rarely used today.

### By Confirmation Status
- **Confirmed LC**: A second bank (confirming bank) adds its own independent undertaking to pay. Protects the beneficiary from issuing bank risk and country risk.
- **Unconfirmed LC**: Only the issuing bank's undertaking. The advising bank has no payment obligation.

### By Payment Terms
| Type | When Payment Occurs |
|------|---------------------|
| **Sight LC** | Immediately upon presentation of conforming documents |
| **Usance/Deferred Payment LC** | At a fixed future date (e.g., 60, 90, 180 days after B/L date) |
| **Acceptance LC** | Beneficiary draws a bill of exchange; bank accepts it (creates a banker's acceptance) |
| **Negotiation LC** | Nominated bank purchases documents before maturity |

### Special Types
- **Standby LC (SBLC)**: Functions as a guarantee; called upon only if the applicant defaults. Governed by ISP98 or UCP 600.
- **Revolving LC**: Reinstates to its original amount after each drawing — used for regular shipments.
- **Transferable LC**: Can be transferred by the first beneficiary to one or more second beneficiaries.
- **Back-to-Back LC**: New LC opened by a middleman using the original LC as collateral.
- **Red Clause LC**: Allows advance payments to the beneficiary before shipment.`,
      },
      {
        slug: 'lc-process',
        title: 'The LC Process Step-by-Step',
        duration_mins: 12,
        infographic_key: 'LetterOfCreditFlow',
        content: `## The LC Process Step-by-Step

The lifecycle of a Letter of Credit involves eight key steps across four parties. Study the process flow diagram carefully.

### Step 1: Sales Contract
The buyer and seller agree on trade terms, including that payment will be made by LC. They specify the LC amount, currency, expiry date, port of loading/discharge, and required documents.

### Step 2: LC Application
The buyer submits an LC application to their bank (the issuing bank), providing all trade details, document requirements, and payment terms.

### Step 3: LC Issuance
The issuing bank evaluates the buyer's creditworthiness and issues the LC, transmitting it via **SWIFT MT700** to the advising bank in the seller's country.

### Step 4: LC Advising
The advising bank authenticates the LC and notifies the beneficiary (seller). At this stage, the beneficiary reviews all terms carefully before proceeding with production/shipment.

### Step 5: Shipment & Document Collection
The seller ships the goods and collects all required documents:
- Commercial Invoice
- Bill of Lading (or Air Waybill)
- Packing List
- Certificate of Origin
- Insurance Certificate (if CIF/CIP terms)
- Inspection Certificate (if required)

### Step 6: Document Presentation
The seller presents the documents to the advising/nominated bank within the LC's presentation period (typically 21 days from shipment, not exceeding the LC expiry).

### Step 7: Document Examination & Forwarding
The advising bank examines documents for compliance (5 banking days maximum under UCP 600 Article 14b). If documents are compliant, they are forwarded to the issuing bank.

### Step 8: Payment
The issuing bank examines the documents. If compliant, it:
1. Releases payment to the advising bank (who pays the beneficiary)
2. Delivers documents to the buyer (who uses them to claim the goods)`,
      },
      {
        slug: 'lc-documents',
        title: 'Required Documents in LC Transactions',
        duration_mins: 10,
        content: `## Required Documents in LC Transactions

### The Bill of Lading (B/L)
The most critical document in sea freight. It serves three functions:
1. **Receipt**: Confirms goods were received by the carrier
2. **Contract of carriage**: Evidence of the shipping contract
3. **Document of title**: Whoever holds the original B/L can claim the goods

**Types**: Full set original (3/3 originals required), straight B/L (non-negotiable), order B/L (negotiable — endorsed in blank or to a named party).

### Commercial Invoice
Must match the LC exactly in description of goods, unit price, total amount, currency, and Incoterm. The invoice amount cannot exceed the LC amount.

### Packing List
Detailed breakdown of cartons, weights (gross/net), dimensions, and marks/numbers. Must be consistent with the invoice and B/L.

### Certificate of Origin
Issued by the exporter's chamber of commerce or trade body. Declares the country where goods were manufactured. Critical for preferential tariff treatment under trade agreements.

### Insurance Certificate / Policy
Required when LC calls for CIF or CIP Incoterms. Must:
- Cover at least 110% of the invoice value (per UCP 600 Article 28)
- Be in the same currency as the LC
- Be dated no later than the shipment date
- Cover the risks specified in the LC

### Common Discrepancies to Avoid
| Discrepancy | Prevention |
|-------------|------------|
| Late presentation (>21 days) | Ship and present documents promptly |
| B/L presented after LC expiry | Monitor expiry dates |
| Description of goods differs | Copy LC wording exactly |
| Partial shipments when prohibited | Ship full quantity in one consignment |
| Short-shipped quantity | Verify weight/quantity certificates |
| Insurance amount insufficient | Ensure 110% coverage minimum |`,
      },
      {
        slug: 'lc-discrepancies',
        title: 'Managing LC Discrepancies',
        duration_mins: 8,
        content: `## Managing LC Discrepancies

A **discrepancy** occurs when the documents presented do not comply strictly with the LC terms. Under UCP 600, banks are required to refuse non-compliant documents.

### Strict Compliance Doctrine
International courts and ICC Banking Commission opinions have consistently upheld the **strict compliance** principle. Minor typographical errors that do not affect meaning are generally acceptable, but material discrepancies result in refusal.

### What Happens When Documents Are Discrepant?

**Option 1: Waiver by Applicant**
The presenting bank notifies the applicant of the discrepancies and seeks a waiver. The applicant may agree to take the documents despite discrepancies. This is the most common resolution.

**Option 2: Re-Presentation**
The beneficiary corrects the documents and re-presents them, provided the LC has not expired and the presentation period remains.

**Option 3: Collection Basis**
Documents are forwarded on a collection basis — the bank releases documents only when the buyer agrees to pay. The beneficiary loses the bank payment guarantee.

**Option 4: Indemnity**
The beneficiary provides a letter of indemnity to the bank, accepting responsibility for any loss arising from the discrepancy.

### Most Common Discrepancies (ICC Survey)
1. Late presentation of documents
2. Bill of lading issued/dated after the LC expiry
3. Description of goods on invoice differs from LC
4. Absence of required documents
5. Insurance coverage insufficient or incorrect
6. Marks and numbers inconsistent across documents
7. Unsigned documents where signature required
8. Bill of lading not showing "on board" notation

### UCP 600 Key Articles for Document Examination
- **Article 14**: Standard for examination of documents (5 banking days)
- **Article 15**: Complying presentation — when to honor
- **Article 16**: Discrepant documents — refusal procedure`,
      },
    ],
    quiz: [
      {
        question_text: 'Under UCP 600, what is the maximum number of banking days a bank has to examine documents?',
        options: [{ key: 'a', text: '3 banking days' }, { key: 'b', text: '5 banking days' }, { key: 'c', text: '7 banking days' }, { key: 'd', text: '10 banking days' }],
        correct_key: 'b',
        explanation: 'UCP 600 Article 14(b) states that a nominated bank, confirming bank, or issuing bank shall have a maximum of five banking days following the day of presentation to determine if a presentation is complying.',
      },
      {
        question_text: 'Which party in an LC transaction is the seller/exporter?',
        options: [{ key: 'a', text: 'Applicant' }, { key: 'b', text: 'Issuing Bank' }, { key: 'c', text: 'Beneficiary' }, { key: 'd', text: 'Advising Bank' }],
        correct_key: 'c',
        explanation: 'The beneficiary is the party in whose favor the LC is issued — the seller or exporter who will receive payment upon presenting complying documents.',
      },
      {
        question_text: 'Under UCP 600, what is the default revocability status of a Letter of Credit?',
        options: [{ key: 'a', text: 'Revocable' }, { key: 'b', text: 'Irrevocable' }, { key: 'c', text: 'Conditional' }, { key: 'd', text: 'Standby' }],
        correct_key: 'b',
        explanation: 'UCP 600 Article 3 states that a credit is irrevocable even if there is no indication to that effect. Under UCP 500, credits could be revocable, but UCP 600 abolished this.',
      },
      {
        question_text: 'What is the minimum insurance coverage percentage required under a CIF LC per UCP 600?',
        options: [{ key: 'a', text: '100% of invoice value' }, { key: 'b', text: '105% of invoice value' }, { key: 'c', text: '110% of invoice value' }, { key: 'd', text: '115% of invoice value' }],
        correct_key: 'c',
        explanation: 'UCP 600 Article 28(f) requires that insurance documents must indicate a minimum coverage of 110% of the CIF or CIP value of the goods.',
      },
      {
        question_text: 'A Confirmed LC differs from an Unconfirmed LC in that:',
        options: [
          { key: 'a', text: 'A confirmed LC can be revoked by the issuing bank' },
          { key: 'b', text: 'A second bank adds its own payment undertaking independent of the issuing bank' },
          { key: 'c', text: 'The beneficiary pays lower bank charges' },
          { key: 'd', text: 'Payment is always at sight under a confirmed LC' },
        ],
        correct_key: 'b',
        explanation: 'Confirmation means an additional bank (confirming bank) adds its own definite undertaking to honour or negotiate the LC. This protects the beneficiary from issuing bank risk and the political/country risk of the buyer\'s country.',
      },
      {
        question_text: 'Which SWIFT message type is used to transmit a Letter of Credit?',
        options: [{ key: 'a', text: 'MT103' }, { key: 'b', text: 'MT202' }, { key: 'c', text: 'MT700' }, { key: 'd', text: 'MT760' }],
        correct_key: 'c',
        explanation: 'MT700 is the SWIFT message type used to issue a Documentary Credit (Letter of Credit). MT760 is used for Bank Guarantees and Standby LCs.',
      },
      {
        question_text: 'The Bill of Lading is unique among trade documents because it is:',
        options: [
          { key: 'a', text: 'Issued by the exporting country\'s customs' },
          { key: 'b', text: 'A document of title, receipt, and contract of carriage' },
          { key: 'c', text: 'Required only for air freight shipments' },
          { key: 'd', text: 'Issued by the buyer\'s bank' },
        ],
        correct_key: 'b',
        explanation: 'The Bill of Lading serves three functions simultaneously: it is a receipt for goods, evidence of the contract of carriage, and most importantly, a document of title — whoever holds the original can claim the goods at destination.',
      },
      {
        question_text: 'What does the "strict compliance" doctrine in LC law mean?',
        options: [
          { key: 'a', text: 'Banks must inspect the actual goods before payment' },
          { key: 'b', text: 'Documents must comply exactly with LC terms on their face' },
          { key: 'c', text: 'The applicant must strictly comply with credit terms' },
          { key: 'd', text: 'Only original documents are acceptable' },
        ],
        correct_key: 'b',
        explanation: 'The strict compliance doctrine means banks examine documents on their face against LC terms. If documents do not comply — even in minor details — the bank may refuse payment. Banks deal in documents, not goods.',
      },
    ],
  },
  'documentary-collections': {
    lessons: [
      {
        slug: 'collections-vs-lc',
        title: 'Collections vs Letters of Credit',
        duration_mins: 8,
        content: `## Documentary Collections vs Letters of Credit

### What is a Documentary Collection?

A **Documentary Collection** is a trade payment method where the exporter's bank (remitting bank) sends shipping documents to the importer's bank (collecting bank) with instructions to release the documents to the importer only upon payment or acceptance of a bill of exchange.

**Key Difference from LC**: In a documentary collection, banks act as agents — they do NOT guarantee payment. The bank's role is administrative, not a payment undertaking.

### Comparative Risk Analysis

| Factor | Open Account | Documentary Collection | Letter of Credit |
|--------|-------------|----------------------|-----------------|
| Exporter Risk | HIGH | MEDIUM | LOW |
| Importer Risk | LOW | LOW-MEDIUM | LOW |
| Bank Payment Guarantee | None | None | Yes |
| Cost | Lowest | Low-Medium | Highest |
| Speed | Fast | Medium | Slower |
| Typical Use | Trusted buyers | Established relationships | New buyers, high-risk markets |

### When to Use Documentary Collections

- Established trading relationship with the buyer
- Stable political and economic environment in buyer's country
- Goods are standard/commodity (easily resold if buyer defaults)
- Buyer's country has no significant transfer restrictions
- The exporter needs lower banking fees than an LC

### Governing Rules: URC 522

Documentary Collections are governed by the **ICC Uniform Rules for Collections (URC 522)**, effective 1996. These rules define the obligations of all parties and establish the standard for document handling.`,
      },
      {
        slug: 'dp-vs-da',
        title: 'D/P vs D/A: The Two Collection Types',
        duration_mins: 12,
        infographic_key: 'DocumentaryCollectionFlow',
        content: `## Documents Against Payment (D/P) vs Documents Against Acceptance (D/A)

### Documents Against Payment (D/P) — Sight Collection

Also called a **Sight Collection** or **Cash Against Documents (CAD)**.

**Process**:
1. Exporter ships goods and sends documents to remitting bank
2. Remitting bank forwards documents to collecting bank
3. Collecting bank presents documents to importer and demands immediate payment
4. Upon payment, documents released — importer can claim goods
5. Collecting bank remits payment to remitting bank, who credits exporter

**Risk Profile**: Lower risk for exporter — the importer cannot obtain the goods without paying first. However, the exporter cannot force the importer to pay; they can only refuse to release documents.

**What if the importer refuses?** The goods sit in the port accumulating storage charges. The exporter must arrange for re-export or local sale — potentially at a loss.

---

### Documents Against Acceptance (D/A) — Term Collection

**Process**:
1. Exporter ships goods and draws a **Bill of Exchange** (draft) on the importer, payable at a future date
2. Documents sent to collecting bank with instruction: "Release documents against acceptance of the draft"
3. Importer signs (accepts) the Bill of Exchange, promising to pay on the due date
4. Documents released to importer — goods can be claimed immediately
5. On the due date, collecting bank presents the accepted bill for payment

**Risk Profile**: HIGHER risk for exporter — the importer receives the goods before paying. If the importer defaults at maturity, the exporter has an accepted bill of exchange (a legal claim) but has already lost the goods.

**The Accepted Bill of Exchange** becomes a negotiable instrument. The exporter can:
- Hold it until maturity and collect
- **Discount** it at a bank for immediate cash (at a cost)
- **Forfait** it — sell it without recourse

---

### URC 522 Key Obligations

| Obligation | Remitting Bank | Collecting Bank |
|-----------|----------------|-----------------|
| Follow principal's instructions | Must | Must |
| Verify documents as listed | Yes | Yes |
| Guarantee payment | NO | NO |
| Protest on non-payment | Only if instructed | Only if instructed |
| Store goods | NOT responsible | NOT responsible |`,
      },
      {
        slug: 'collection-parties',
        title: 'Roles of the Banks in Collections',
        duration_mins: 8,
        content: `## Roles of the Banks in Documentary Collections

### The Remitting Bank (Exporter's Bank)

The remitting bank acts as the exporter's agent. Its responsibilities include:

- Receiving documents and collection instructions from the exporter (the **principal**)
- Forwarding documents to the collecting bank with a covering schedule (URC 522 Form)
- Transmitting payment proceeds to the exporter when received
- Following the principal's instructions on protest, warehousing, and insurance

**Limitation**: The remitting bank bears no responsibility if the collecting bank fails to follow instructions, provided it selected the collecting bank in good faith.

### The Collecting Bank (Importer's Bank / Presenting Bank)

- Receives the documents and collection order from the remitting bank
- Presents documents to the importer (drawee) and collects payment or acceptance
- Remits funds to the remitting bank after deducting charges
- Follows URC 522 rules regarding timing of presentation

**"Presenting Bank"**: When the collecting bank directly presents the documents to the drawee, it is also called the presenting bank. Sometimes these are different institutions.

### The Principal (Exporter)

- Initiates the collection by providing documents and a **Collection Order** to the remitting bank
- Bears the commercial risk if the buyer defaults
- Must give clear, complete instructions (URC 522 Article 4)

### The Drawee (Importer/Buyer)

- The party to whom presentation is made
- Must pay (D/P) or accept a bill of exchange (D/A) to obtain documents
- Has no obligation to the banks — their obligation is commercial, to the exporter

### Key URC 522 Articles
- **Article 4**: Collection instructions must be complete and precise
- **Article 9**: Good faith and reasonable care obligations of banks
- **Article 26**: Case-of-need — the exporter can appoint a representative in the buyer's country`,
      },
    ],
    quiz: [
      {
        question_text: 'In a Documentary Collection, do the banks guarantee payment to the exporter?',
        options: [
          { key: 'a', text: 'Yes, the collecting bank guarantees payment' },
          { key: 'b', text: 'Yes, the remitting bank guarantees payment' },
          { key: 'c', text: 'No — banks act as agents only, with no payment obligation' },
          { key: 'd', text: 'Only if the collection is confirmed' },
        ],
        correct_key: 'c',
        explanation: 'Unlike Letters of Credit, banks in documentary collections have NO obligation to pay the exporter. They act purely as agents, following instructions to present and release documents. The payment risk remains entirely with the exporter.',
      },
      {
        question_text: 'Under a D/P (Documents Against Payment) collection, when does the importer receive the shipping documents?',
        options: [
          { key: 'a', text: 'Upon signing a bill of exchange' },
          { key: 'b', text: 'Immediately upon presentation' },
          { key: 'c', text: 'Only after making immediate payment to the collecting bank' },
          { key: 'd', text: 'After the goods arrive at the destination port' },
        ],
        correct_key: 'c',
        explanation: 'In a D/P (sight) collection, the collecting bank releases documents only upon the importer\'s payment in full. This ensures the exporter retains control of the goods (via documents) until payment is received.',
      },
      {
        question_text: 'Which ICC publication governs Documentary Collections?',
        options: [{ key: 'a', text: 'UCP 600' }, { key: 'b', text: 'URDG 758' }, { key: 'c', text: 'URC 522' }, { key: 'd', text: 'ISP98' }],
        correct_key: 'c',
        explanation: 'Documentary Collections are governed by the ICC Uniform Rules for Collections (URC 522), which came into effect on January 1, 1996. UCP 600 governs Letters of Credit, URDG 758 governs Demand Guarantees.',
      },
      {
        question_text: 'What is the main risk for an exporter using D/A (Documents Against Acceptance)?',
        options: [
          { key: 'a', text: 'The importer receives the goods before paying' },
          { key: 'b', text: 'The bank may misplace the documents' },
          { key: 'c', text: 'The goods may be delayed at customs' },
          { key: 'd', text: 'The exchange rate may change before payment' },
        ],
        correct_key: 'a',
        explanation: 'Under D/A, documents are released to the importer upon acceptance of a bill of exchange — meaning the importer gets the goods immediately but only promises to pay later. If the importer defaults at maturity, the exporter has lost both the goods and the payment.',
      },
    ],
  },
  'bank-guarantees': {
    lessons: [
      {
        slug: 'guarantees-vs-suretyship',
        title: 'Guarantees vs Suretyship',
        duration_mins: 8,
        content: `## Bank Guarantees vs Suretyship

### What is a Bank Guarantee?

A **Bank Guarantee** is a written undertaking by a bank (the guarantor) to pay a specified sum to a third party (the beneficiary) if the bank's customer (the principal/applicant) fails to fulfill their contractual obligations.

### Two Fundamental Legal Structures

#### 1. Demand Guarantee (Independent Guarantee)
- **Primary obligation** of the guarantor bank
- The guarantor pays upon the beneficiary's **first written demand**, without requiring proof of the principal's default
- The bank cannot invoke the underlying contract between principal and beneficiary as a defense
- This is the standard form in international trade
- Governed by **URDG 758** (ICC Uniform Rules for Demand Guarantees)

#### 2. Surety Bond / Accessory Guarantee
- **Secondary obligation** — the guarantor's liability is tied to the underlying contract
- The beneficiary must first prove the principal has actually defaulted
- The surety can invoke all defenses available to the principal
- More common in domestic construction contracts in common law countries

### Key Distinction

| Feature | Demand Guarantee | Surety Bond |
|---------|-----------------|-------------|
| Type of obligation | Independent/Primary | Accessory/Secondary |
| Demand requirement | Written demand only | Must prove default |
| Bank can use principal's defenses | No | Yes |
| Governing rules | URDG 758 | Local law |
| Common in | International trade | Domestic projects |

### The "Pay First, Argue Later" Principle
Demand guarantees operate on the principle that the guarantor pays first and the principal argues later in a separate legal proceeding. This makes demand guarantees very attractive to beneficiaries but potentially risky for principals (fraudulent demands).`,
      },
      {
        slug: 'types-of-guarantees',
        title: 'Types of Bank Guarantees',
        duration_mins: 12,
        infographic_key: 'BankGuaranteeFlow',
        content: `## Types of Bank Guarantees

### Performance Guarantee (Performance Bond)
**Purpose**: Ensures the principal fulfills their contractual obligations (delivers goods on time, completes construction, etc.)

**Typical Amount**: 5–10% of contract value

**Used In**: Construction contracts, supply contracts, service agreements

**Called When**: Principal fails to perform according to contract terms, misses deadlines, or delivers non-conforming goods/services.

---

### Advance Payment Guarantee
**Purpose**: Protects the buyer who has made an advance payment to a seller/contractor

**Amount**: Equal to the advance payment (often 10–30% of contract value)

**Used In**: Large capital projects, custom manufacturing, long-term supply contracts

**Called When**: The seller/contractor fails to deliver the goods or complete the project after receiving the advance.

**Key Feature**: The guarantee amount typically **reduces automatically** as deliveries are made (a "reducing guarantee").

---

### Bid Bond (Tender Guarantee)
**Purpose**: Ensures a bidder submitting a tender will sign the contract if their bid is selected

**Amount**: 2–5% of the bid/tender amount

**Used In**: Government tenders, construction projects, procurement processes

**Called When**: The winning bidder withdraws their bid, fails to sign the contract, or cannot provide a performance bond.

---

### Payment Guarantee
**Purpose**: Guarantees that the buyer will pay the seller for goods delivered or services rendered

**Used In**: Trade transactions where the buyer cannot obtain an LC, open account trade

**Key Difference from LC**: Payment guarantees are demand instruments — the seller calls them only if the buyer fails to pay. An LC is the primary payment mechanism.

---

### Retention Bond / Maintenance Guarantee
**Purpose**: Replaces the retention money withheld by the employer in construction contracts

**Benefit for Contractor**: Receive the retained amount immediately rather than waiting for the defects liability period to expire`,
      },
      {
        slug: 'demand-vs-conditional',
        title: 'Demand vs Conditional Guarantees',
        duration_mins: 8,
        content: `## Demand Guarantees vs Conditional Guarantees

### Demand Guarantees
A **demand guarantee** is payable upon the beneficiary's simple written demand, without any requirement to prove actual loss or default.

**Standard Demand Language**:
> "We undertake to pay you any amount up to [amount] upon receipt of your first written demand stating that [the principal] has failed to perform their obligations under [the contract]."

The guarantor bank examines only whether the demand is compliant on its face — it cannot investigate whether the underlying default actually occurred.

**Protection Against Abusive Calls (URDG 758 Article 19)**:
If a principal can show a demand is "manifestly abusive or fraudulent" and obtains a court injunction, the bank may be restrained from paying. However, courts set a very high bar for this.

### Conditional Guarantees
A **conditional guarantee** requires the beneficiary to provide evidence of the principal's default before the bank pays.

Common conditions:
- An arbitral award or court judgment confirming the default
- A surveyor's certificate confirming non-performance
- A joint written statement from both principal and beneficiary confirming the default

**Trade-off**: Conditional guarantees are more protective of the principal but less valuable to the beneficiary (who may wait years for a judgment). International buyers typically insist on demand guarantees.

### URDG 758 vs UCP 600 for Standby LCs
Both URDG 758 and ISP98 (International Standby Practices) govern standby instruments, but with different emphases:

| Feature | URDG 758 | ISP98 |
|---------|----------|-------|
| Designed for | Demand guarantees | Standby LCs |
| Documents required | Demand + statement of breach | Varies by terms |
| Expiry rules | Explicit non-payment of charges does not extend | Complex expiry rules |
| Jurisdiction | Civil law friendly | Common law friendly |`,
      },
    ],
    quiz: [
      {
        question_text: 'A Demand Guarantee differs from a Surety Bond because:',
        options: [
          { key: 'a', text: 'A demand guarantee requires proof of actual default before payment' },
          { key: 'b', text: 'A demand guarantee is payable on first written demand without proving default' },
          { key: 'c', text: 'A demand guarantee is only used in domestic transactions' },
          { key: 'd', text: 'A demand guarantee is always for 100% of the contract value' },
        ],
        correct_key: 'b',
        explanation: 'Demand guarantees operate independently of the underlying contract. The beneficiary only needs to present a compliant demand — the bank pays without requiring proof of actual default or breach.',
      },
      {
        question_text: 'Which ICC publication governs Demand Guarantees?',
        options: [{ key: 'a', text: 'UCP 600' }, { key: 'b', text: 'URC 522' }, { key: 'c', text: 'URDG 758' }, { key: 'd', text: 'INCOTERMS 2020' }],
        correct_key: 'c',
        explanation: 'URDG 758 (Uniform Rules for Demand Guarantees, ICC Publication No. 758) governs demand guarantees. It came into force on July 1, 2010, replacing URDG 458.',
      },
      {
        question_text: 'A Bid Bond is typically for what percentage of the tender amount?',
        options: [{ key: 'a', text: '10-30%' }, { key: 'b', text: '2-5%' }, { key: 'c', text: '50%' }, { key: 'd', text: '100%' }],
        correct_key: 'b',
        explanation: 'Bid bonds (tender guarantees) are typically 2-5% of the bid value. Their purpose is to ensure serious participation in tenders — not to cover the full contract value.',
      },
    ],
  },
  'supply-chain-finance': {
    lessons: [
      {
        slug: 'working-capital',
        title: 'Working Capital Fundamentals',
        duration_mins: 10,
        content: `## Working Capital Fundamentals

### The Cash Conversion Cycle (CCC)

Working capital management centers on the **Cash Conversion Cycle** — the time it takes to convert investments in inventory and other resources into cash flows from sales.

**Formula**: CCC = DIO + DSO - DPO

Where:
- **DIO** (Days Inventory Outstanding) = How many days inventory is held
- **DSO** (Days Sales Outstanding) = How many days to collect receivables from customers
- **DPO** (Days Payable Outstanding) = How many days to pay suppliers

### The Working Capital Tension

Every supply chain has a fundamental conflict:
- **Buyers** want to extend payment terms (maximize DPO → improve their cash position)
- **Suppliers** want to be paid quickly (minimize DSO → reduce their cash tied up in receivables)

This tension creates the opportunity for **Supply Chain Finance (SCF)** — using the buyer's stronger credit rating to help suppliers access cheaper financing.

### Why Supplier Financial Health Matters to Buyers

A buyer's supply chain is only as strong as its weakest supplier. If key suppliers face cash flow crises:
- Production halts
- Quality declines
- Business continuity risk increases

SCF programs address this by improving supplier liquidity without increasing the buyer's borrowing.

### Key Working Capital Metrics

| Metric | Formula | Lower is Better For |
|--------|---------|---------------------|
| DIO | (Inventory ÷ COGS) × 365 | Buyer |
| DSO | (Receivables ÷ Revenue) × 365 | Supplier |
| DPO | (Payables ÷ COGS) × 365 | Buyer |
| CCC | DIO + DSO - DPO | Both (lower = better) |`,
      },
      {
        slug: 'payables-finance',
        title: 'Payables Finance (Reverse Factoring)',
        duration_mins: 12,
        infographic_key: 'SupplyChainFinanceFlow',
        content: `## Payables Finance (Reverse Factoring)

### What is Payables Finance?

**Payables Finance** (also called Reverse Factoring or Approved Payables Finance) is a buyer-led SCF program where:
1. The buyer approves invoices for early payment
2. Suppliers can access early payment from a financing bank at the buyer's credit rate
3. The buyer pays the bank on the original (extended) due date

### The Key Insight: Credit Arbitrage

In a traditional supply relationship:
- Buyer (AAA rated, large corporation) wants to pay in 90 days
- Supplier (BB rated, SME) needs cash in 30 days
- Supplier's cost to borrow: 8% per annum

With Payables Finance:
- The bank finances the supplier at the **buyer's credit rate** (e.g., 2.5% per annum)
- The supplier gets early payment at a much lower discount rate
- The buyer keeps its 90-day payment terms (or extends them)
- The bank earns the spread

### The Three-Party Mechanism

**Step 1: Invoice Submission**
- Supplier delivers goods and submits invoice to buyer
- Buyer approves the invoice on the SCF platform

**Step 2: Financing Offer**
- Bank sees the approved invoice on the platform
- Bank offers the supplier early payment at a discount rate

**Step 3: Early Payment**
- Supplier accepts the offer → receives (Invoice Amount - Discount Fee)
- E.g., €1,000,000 invoice × 2.5% annual rate × 60 days early = €4,167 fee
- Supplier receives: €995,833

**Step 4: Settlement**
- On the original due date, the buyer pays the bank in full (€1,000,000)
- The bank collects its fee from the earlier discount

### Accounting Treatment Controversy

Whether Payables Finance appears as trade payables or financial debt on the buyer's balance sheet is crucial. The IASB has required enhanced disclosure under IAS 7 since 2023, following concerns that SCF programs were being used to hide debt.`,
      },
      {
        slug: 'receivables-finance',
        title: 'Receivables Finance and Invoice Discounting',
        duration_mins: 10,
        content: `## Receivables Finance and Invoice Discounting

### What is Receivables Finance?

**Receivables Finance** is a supplier-led financing solution where the supplier sells its trade receivables (unpaid invoices) to a financing institution at a discount, in exchange for immediate cash.

Unlike Payables Finance, this is initiated by the **supplier**, not the buyer.

### Key Structures

#### 1. Factoring
- The factor (bank/specialist) purchases the full **ledger** of receivables
- The factor takes on credit risk (non-recourse factoring) or retains recourse to the seller
- The factor manages collections — customers pay directly to the factor
- The factor advances 80-90% of invoice value; releases remainder (minus fees) on collection

**With Recourse vs Without Recourse**:
- **With recourse**: If the debtor doesn't pay, the factor can claim back from the seller. Lower cost.
- **Without recourse (non-recourse)**: Factor absorbs the credit risk. Higher cost, off-balance-sheet treatment for seller.

#### 2. Invoice Discounting (Confidential)
- Similar to factoring but the **seller retains control of the sales ledger**
- Customers are NOT aware their invoices have been discounted
- The seller collects payment from customers and remits to the financier
- More suitable for larger, credit-worthy suppliers

#### 3. Asset-Based Lending (ABL)
- A revolving credit facility secured against a pool of receivables (and sometimes inventory)
- The facility limit fluctuates with the borrowing base (value of eligible receivables)

### Forfaiting vs Factoring

| Feature | Factoring | Forfaiting |
|---------|-----------|-----------|
| Tenor | Short-term (30-180 days) | Medium/long-term (1-7 years) |
| Instrument | Trade invoices | Bills of exchange, promissory notes |
| Recourse | Can be either | Always without recourse |
| Volume | Multiple invoices | Individual large transactions |`,
      },
    ],
    quiz: [
      {
        question_text: 'The Cash Conversion Cycle (CCC) is calculated as:',
        options: [
          { key: 'a', text: 'DSO + DPO - DIO' },
          { key: 'b', text: 'DIO + DSO - DPO' },
          { key: 'c', text: 'DIO - DSO + DPO' },
          { key: 'd', text: 'DPO + DIO + DSO' },
        ],
        correct_key: 'b',
        explanation: 'CCC = DIO (Days Inventory Outstanding) + DSO (Days Sales Outstanding) - DPO (Days Payable Outstanding). A lower CCC means faster conversion of resources to cash.',
      },
      {
        question_text: 'Payables Finance (Reverse Factoring) is primarily initiated by:',
        options: [{ key: 'a', text: 'The supplier' }, { key: 'b', text: 'The financing bank' }, { key: 'c', text: 'The buyer' }, { key: 'd', text: 'The central bank' }],
        correct_key: 'c',
        explanation: 'Payables Finance is buyer-led — the buyer sets up the program with a bank, approves invoices, and allows their suppliers to access early payment based on the buyer\'s credit rating. This distinguishes it from factoring, which is supplier-initiated.',
      },
      {
        question_text: 'In Non-Recourse Factoring, who bears the credit risk if the buyer defaults?',
        options: [{ key: 'a', text: 'The supplier (seller of invoices)' }, { key: 'b', text: 'The factor (financing institution)' }, { key: 'c', text: 'The buyer\'s bank' }, { key: 'd', text: 'The trade credit insurer' }],
        correct_key: 'b',
        explanation: 'In non-recourse factoring, the factor purchases the receivables without recourse — meaning if the buyer (debtor) fails to pay, the factor absorbs the loss. The supplier has transferred the credit risk in exchange for a higher discount rate.',
      },
    ],
  },
  'incoterms': {
    lessons: [
      {
        slug: 'why-incoterms',
        title: 'Why Incoterms Exist',
        duration_mins: 8,
        content: `## Why Incoterms Exist

### The Problem Incoterms Solve

In international trade, buyers and sellers in different countries often have different legal systems, languages, and business customs. Before Incoterms, there was significant ambiguity about who was responsible for:
- **Freight costs** from origin to destination
- **Insurance** coverage during transit
- **Export clearance** (packing, loading, export documentation)
- **Import clearance** (customs duties, import taxes)
- **Risk of loss or damage** — at what point does risk transfer from seller to buyer?

### What Are Incoterms?

**Incoterms** (International Commercial Terms) are a set of 11 standardized three-letter trade terms published by the **International Chamber of Commerce (ICC)**. The current version is **Incoterms® 2020**, effective January 1, 2020.

Each Incoterm defines:
1. **The point where risk transfers** from seller to buyer
2. **Who pays for freight** costs to each point
3. **Who is responsible for insurance**
4. **Who handles export/import clearance**

### Important: What Incoterms Do NOT Cover

- Transfer of ownership/title (governed by the sales contract)
- Price or payment terms
- Remedies for breach of contract
- Intellectual property rights

### The 11 Incoterms 2020

They are divided into two groups:
- **Any Mode**: EXW, FCA, CPT, CIP, DAP, DPU, DDP (can be used for any transport mode)
- **Sea/Inland Waterway Only**: FAS, FOB, CFR, CIF (only for sea/barge transport)`,
      },
      {
        slug: 'exw-fca',
        title: 'EXW and FCA — Minimum Seller Obligation',
        duration_mins: 10,
        infographic_key: 'IncotermsRiskMap',
        content: `## EXW and FCA — Minimum Seller Obligations

### EXW — Ex Works (Named Place of Delivery)

**Risk Transfer**: At the seller's premises (factory, warehouse)

**Seller's Obligations (MINIMUM)**:
- Pack and label the goods
- Make goods available at named place
- Provide commercial invoice

**Buyer's Obligations (MAXIMUM)**:
- All export clearance and export duties
- Loading at seller's premises
- All freight (origin handling, sea freight, destination)
- All import clearance, import duties, delivery

**When to Use**: When the buyer has strong logistics capabilities and wants full control. The seller's risk and obligation ends the moment the goods are ready for collection.

**Caution for Sellers**: EXW provides the least protection for the seller's ability to obtain an LC payment, because the seller cannot easily obtain a "clean on board" Bill of Lading required by most LCs.

---

### FCA — Free Carrier (Named Place of Delivery)

**Risk Transfer**: When goods are delivered to the carrier nominated by the buyer, at the named place

**Two Scenarios**:
1. **Named place = Seller's premises**: Risk transfers when goods are loaded onto the buyer's collecting vehicle
2. **Named place = Another location** (e.g., a freight terminal): Risk transfers when goods are delivered to the carrier at that location, ready for unloading

**Incoterms 2020 Change — FCA with On Board B/L**:
A significant addition in Incoterms 2020: the buyer and seller can agree that the buyer will instruct their carrier to issue an "on board" Bill of Lading to the seller after loading. This allows sellers using FCA to still obtain the clean on board B/L required by LCs.

**Export Clearance**: Seller's responsibility (unlike EXW)

**Why FCA is Preferred Over EXW for Most Sellers**: The seller handles export clearance (which is easier in the seller's country) but risk transfers early.`,
      },
    ],
    quiz: [
      {
        question_text: 'Under which Incoterm does the seller bear the MINIMUM risk and obligation?',
        options: [{ key: 'a', text: 'DDP' }, { key: 'b', text: 'CIF' }, { key: 'c', text: 'EXW' }, { key: 'd', text: 'FOB' }],
        correct_key: 'c',
        explanation: 'EXW (Ex Works) places the minimum obligation on the seller — risk transfers at the seller\'s premises. The buyer is responsible for loading, all freight, export clearance, and import clearance.',
      },
      {
        question_text: 'Which Incoterms terms are restricted to sea and inland waterway transport ONLY?',
        options: [
          { key: 'a', text: 'EXW, FCA, CPT, CIP' },
          { key: 'b', text: 'DAP, DPU, DDP' },
          { key: 'c', text: 'FAS, FOB, CFR, CIF' },
          { key: 'd', text: 'All Incoterms can be used for any transport mode' },
        ],
        correct_key: 'c',
        explanation: 'FAS (Free Alongside Ship), FOB (Free On Board), CFR (Cost and Freight), and CIF (Cost, Insurance and Freight) are the four Incoterms restricted to sea and inland waterway transport only. All other 7 Incoterms can be used for any mode of transport.',
      },
      {
        question_text: 'Under DDP (Delivered Duty Paid), who is responsible for import customs clearance and import duties?',
        options: [{ key: 'a', text: 'The buyer' }, { key: 'b', text: 'The carrier' }, { key: 'c', text: 'The seller' }, { key: 'd', text: 'The customs broker' }],
        correct_key: 'c',
        explanation: 'DDP (Delivered Duty Paid) places the MAXIMUM obligation on the seller — the seller is responsible for all costs and risks including import customs clearance and import duties at the named destination.',
      },
    ],
  },
  'trade-finance-risk': {
    lessons: [
      {
        slug: 'country-risk',
        title: 'Country Risk in Trade Finance',
        duration_mins: 10,
        content: `## Country Risk in Trade Finance

### What is Country Risk?

**Country risk** refers to the risk that a counterparty in a foreign country will be unable or unwilling to fulfill their obligations due to factors beyond their control — factors specific to that country.

### Categories of Country Risk

#### 1. Political Risk
The risk that government actions or political instability will impair a transaction:
- **Expropriation**: Government seizes the buyer's business or assets
- **War and civil unrest**: Disrupts trade flows and ability to pay
- **Political embargoes**: Government prohibits imports/exports
- **Contract frustration**: Government decrees prevent contract performance

#### 2. Transfer and Convertibility Risk
- **Transfer risk**: Government prevents funds from being transferred abroad (capital controls)
- **Convertibility risk**: Local currency cannot be converted to hard currency for international payment
- **This is distinct from credit risk** — the importer may be willing and able to pay in local currency but unable to pay in USD/EUR due to FX restrictions

#### 3. Sovereign Risk
- The risk that a foreign government itself defaults on its obligations
- Relevant when the counterparty is a government entity or state-owned enterprise
- Country credit ratings (Moody's, S&P, Fitch) provide a proxy for sovereign risk

### Measuring Country Risk

**Key Sources**:
- OECD Country Risk Classifications (0-7 scale, used for ECA pricing)
- COFACE Country Risk Assessments (A1-E scale)
- EIU (Economist Intelligence Unit) Country Risk Ratings
- World Bank Doing Business Indicators
- Political Risk Services (PRS) Group

### Mitigation Instruments
- **Export Credit Agency (ECA) insurance**: Government agencies (UKEF, Euler Hermes, US Exim Bank) provide political risk insurance
- **Confirmed LC**: The confirming bank absorbs country risk — beneficiary is insulated
- **Political risk insurance**: Private market (Lloyd's of London)`,
      },
      {
        slug: 'credit-risk',
        title: 'Counterparty Credit Risk',
        duration_mins: 10,
        infographic_key: 'TradeRiskMatrix',
        content: `## Counterparty Credit Risk in Trade Finance

### The Risk Matrix Framework

The choice of trade finance instrument should match the risk profile of the transaction. The **Risk Matrix** (see infographic) maps transactions along two dimensions:
- **Probability of Non-Payment**: How likely is the buyer to default?
- **Severity of Loss**: How large is the potential loss?

### Risk-Instrument Matching

#### Low Risk (Open Account)
**When**: Established buyer, strong credit rating, OECD country
**Payment Method**: Open Account (invoice + bank transfer)
**Mitigation**: Trade Credit Insurance (e.g., Euler Hermes, Atradius, Coface)

#### Medium Risk (Documentary Collection)
**When**: Known buyer, some relationship, moderate country risk
**Payment Method**: Documentary Collection (D/P or D/A)
**Mitigation**: Retains document control until payment/acceptance

#### High Country Risk / Large Amount (Standby LC / Guarantee)
**When**: Large single contract value, new buyer in stable country
**Payment Method**: Bank Guarantee or Standby LC as backup
**Mitigation**: Bank's contingent payment obligation if buyer defaults

#### High Buyer Credit Risk + High Country Risk (Confirmed LC)
**When**: Unknown buyer, high-risk country, large value
**Payment Method**: Confirmed Irrevocable LC
**Mitigation**: Two bank guarantees — issuing bank + confirming bank

### Credit Assessment Framework for Trade Finance

**Quantitative Factors**:
- Financial statements: debt/equity ratio, interest coverage, current ratio
- Payment track record with existing suppliers
- Credit bureau/Dun & Bradstreet reports

**Qualitative Factors**:
- Industry position and competitive strength
- Quality of management
- Ownership structure (state-owned? family-owned?)
- Auditor reputation and financial reporting quality

### Basel III Impact on Trade Finance
Post-2008 regulations significantly impacted trade finance:
- **Credit Conversion Factor (CCF)**: Trade finance instruments were given punitive CCFs under early Basel III drafts
- **ICC advocacy** led to favorable treatment for self-liquidating, short-term trade finance
- LCs and guarantees now have more appropriate capital treatment under Basel IV`,
      },
      {
        slug: 'fraud-risk',
        title: 'Fraud Risk in Trade Finance',
        duration_mins: 8,
        content: `## Fraud Risk in Trade Finance

### Why Trade Finance is Attractive to Fraudsters

Trade finance involves large sums, multiple parties across jurisdictions, physical goods, and paper documents — creating multiple opportunities for fraud. The ICC's 2020 report estimated trade finance fraud at billions of dollars annually.

### Common Trade Finance Fraud Schemes

#### 1. Document Fraud
- **Forged Bills of Lading**: Presenting fake shipping documents to claim LC payment for non-existent goods
- **Inflated Invoices**: Overstating goods value to obtain larger financing
- **Multiple Financing**: Using the same invoice/B/L to obtain financing from multiple banks simultaneously

#### 2. Commodity Fraud
- **Fake Warehouse Receipts**: Claiming stored commodities that don't exist or have already been sold
- **Grade Fraud**: Shipping inferior goods while presenting certificates for higher-grade commodities
- **The "missing nickel" scandals**: Multiple metals finance frauds involving fake warehouse receipts

#### 3. Ghost Shipment / Phantom Goods
- Creating an entire fictional trade transaction — no goods are ever shipped
- Often involves collusion between buyer and seller to defraud banks

#### 4. Round-Tripping
- Goods are "exported" and then immediately "imported" back, generating artificial trade flows
- Used for capital flight and money laundering

### Prevention and Detection

**For Banks**:
- Physical inspection of goods / third-party inspection certificates
- Vessel tracking verification (AIS data)
- Registry checking for Bill of Lading verification
- Cross-checking multiple data sources (shipping, customs, port data)
- Beneficial ownership verification of counterparties

**Technological Solutions**:
- **Blockchain-based trade platforms** (Marco Polo, we.trade, Contour)
- **Digital document verification** (CargoX, eBL platforms)
- **AI-powered anomaly detection** in trade flows`,
      },
    ],
    quiz: [
      {
        question_text: 'Transfer Risk in trade finance refers to:',
        options: [
          { key: 'a', text: 'The risk of goods being transferred to the wrong buyer' },
          { key: 'b', text: 'The risk that a government prevents funds from being sent abroad' },
          { key: 'c', text: 'The risk of wire transfer fraud' },
          { key: 'd', text: 'The risk of documents being lost in transit' },
        ],
        correct_key: 'b',
        explanation: 'Transfer Risk (also called Transfer & Convertibility Risk) is the risk that a foreign government imposes capital controls, preventing the buyer from sending payment abroad in the required currency. The buyer may be willing and able to pay in local currency but cannot access foreign exchange.',
      },
      {
        question_text: 'For a transaction with HIGH buyer credit risk and HIGH country risk, the most appropriate payment instrument is:',
        options: [
          { key: 'a', text: 'Open Account' },
          { key: 'b', text: 'Documentary Collection (D/P)' },
          { key: 'c', text: 'Confirmed Irrevocable Letter of Credit' },
          { key: 'd', text: 'Bank Guarantee' },
        ],
        correct_key: 'c',
        explanation: 'A Confirmed Irrevocable LC provides the maximum protection: the issuing bank guarantees payment against the buyer\'s credit risk, and the confirming bank guarantees against the country/issuing bank risk. This double-bank protection is appropriate for high-risk transactions.',
      },
      {
        question_text: 'Which of the following is an example of "multiple financing" fraud in trade finance?',
        options: [
          { key: 'a', text: 'Obtaining advance payment from multiple buyers' },
          { key: 'b', text: 'Using the same invoice to obtain financing from multiple banks simultaneously' },
          { key: 'c', text: 'Taking multiple bank guarantees for the same contract' },
          { key: 'd', text: 'Opening multiple LC accounts at different banks' },
        ],
        correct_key: 'b',
        explanation: 'Multiple financing (also called duplicate financing) involves presenting the same invoice or Bill of Lading to multiple banks to obtain financing. The same receivable is pledged multiple times, defrauding the banks that believe they have a unique claim.',
      },
    ],
  },
}
