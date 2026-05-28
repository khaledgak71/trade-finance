-- Seed modules
insert into public.modules (slug, title, description, icon, order_index) values
  ('letters-of-credit',       'Letters of Credit',         'Master UCP 600, LC types, document compliance, and the complete 8-step process flow.',          '🏦', 1),
  ('documentary-collections', 'Documentary Collections',   'D/P vs D/A mechanics, URC 522 rules, and the role of banks in trade collections.',               '📄', 2),
  ('bank-guarantees',         'Bank Guarantees',           'Demand guarantees, URDG 758, performance bonds, and the guarantee triangle.',                     '🛡️', 3),
  ('supply-chain-finance',    'Supply Chain Finance',      'Working capital optimization, payables finance, reverse factoring, and invoice discounting.',     '🔗', 4),
  ('incoterms',               'Incoterms® 2020',           'All 11 Incoterms, risk transfer points, and mode-of-transport restrictions.',                     '🚢', 5),
  ('trade-finance-risk',      'Trade Finance Risk',        'Country risk, credit risk, fraud detection, FX risk, and compliance in trade finance.',           '⚠️', 6)
on conflict (slug) do nothing;

-- Seed lessons for Letters of Credit
with mod as (select id from public.modules where slug = 'letters-of-credit')
insert into public.lessons (module_id, slug, title, infographic_key, order_index, duration_mins)
select mod.id, slug, title, infographic_key, order_index, duration_mins from mod, (values
  ('what-is-lc',       'What is a Letter of Credit?',           null,                    1, 8),
  ('types-of-lc',      'Types of Letters of Credit',             null,                    2, 10),
  ('lc-process',       'The LC Process Step-by-Step',            'LetterOfCreditFlow',     3, 12),
  ('lc-documents',     'Required Documents in LC Transactions',  null,                    4, 10),
  ('lc-discrepancies', 'Managing LC Discrepancies',              null,                    5, 8)
) as v(slug, title, infographic_key, order_index, duration_mins)
on conflict (module_id, slug) do nothing;

-- Seed lessons for Documentary Collections
with mod as (select id from public.modules where slug = 'documentary-collections')
insert into public.lessons (module_id, slug, title, infographic_key, order_index, duration_mins)
select mod.id, slug, title, infographic_key, order_index, duration_mins from mod, (values
  ('collections-vs-lc',   'Collections vs Letters of Credit',       null,                          1, 8),
  ('dp-vs-da',            'D/P vs D/A: The Two Collection Types',    'DocumentaryCollectionFlow',   2, 12),
  ('collection-parties',  'Roles of the Banks in Collections',       null,                          3, 8)
) as v(slug, title, infographic_key, order_index, duration_mins)
on conflict (module_id, slug) do nothing;

-- Seed lessons for Bank Guarantees
with mod as (select id from public.modules where slug = 'bank-guarantees')
insert into public.lessons (module_id, slug, title, infographic_key, order_index, duration_mins)
select mod.id, slug, title, infographic_key, order_index, duration_mins from mod, (values
  ('guarantees-vs-suretyship', 'Guarantees vs Suretyship',           null,                 1, 8),
  ('types-of-guarantees',      'Types of Bank Guarantees',            'BankGuaranteeFlow',  2, 12),
  ('demand-vs-conditional',    'Demand vs Conditional Guarantees',   null,                 3, 8)
) as v(slug, title, infographic_key, order_index, duration_mins)
on conflict (module_id, slug) do nothing;

-- Seed lessons for Supply Chain Finance
with mod as (select id from public.modules where slug = 'supply-chain-finance')
insert into public.lessons (module_id, slug, title, infographic_key, order_index, duration_mins)
select mod.id, slug, title, infographic_key, order_index, duration_mins from mod, (values
  ('working-capital',     'Working Capital Fundamentals',              null,                      1, 10),
  ('payables-finance',    'Payables Finance (Reverse Factoring)',       'SupplyChainFinanceFlow',  2, 12),
  ('receivables-finance', 'Receivables Finance and Invoice Discounting',null,                     3, 10)
) as v(slug, title, infographic_key, order_index, duration_mins)
on conflict (module_id, slug) do nothing;

-- Seed lessons for Incoterms
with mod as (select id from public.modules where slug = 'incoterms')
insert into public.lessons (module_id, slug, title, infographic_key, order_index, duration_mins)
select mod.id, slug, title, infographic_key, order_index, duration_mins from mod, (values
  ('why-incoterms', 'Why Incoterms Exist',                null,              1, 8),
  ('exw-fca',       'EXW and FCA — Minimum Seller Obligation', 'IncotermsRiskMap', 2, 10)
) as v(slug, title, infographic_key, order_index, duration_mins)
on conflict (module_id, slug) do nothing;

-- Seed lessons for Trade Finance Risk
with mod as (select id from public.modules where slug = 'trade-finance-risk')
insert into public.lessons (module_id, slug, title, infographic_key, order_index, duration_mins)
select mod.id, slug, title, infographic_key, order_index, duration_mins from mod, (values
  ('country-risk',  'Country Risk in Trade Finance',     null,               1, 10),
  ('credit-risk',   'Counterparty Credit Risk',           'TradeRiskMatrix',  2, 10),
  ('fraud-risk',    'Fraud Risk in Trade Finance',        null,               3, 8)
) as v(slug, title, infographic_key, order_index, duration_mins)
on conflict (module_id, slug) do nothing;
