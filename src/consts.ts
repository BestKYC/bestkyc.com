export const SITE = {
  name: 'BestKYC',
  url: 'https://www.bestkyc.com',
  domain: 'bestkyc.com',
  title: 'BestKYC — Rankings of KYC, KYB, AML and Fraud Prevention Software',
  description:
    "We rank the software that verifies identities, companies, and transactions. Written by the people who already pick it for a living.",
  locale: 'en_US',
  twitter: '',
} as const;

export const CATEGORIES = {
  kyc: {
    slug: 'kyc',
    label: 'KYC & ID Verification',
    description: 'Confirming a real human is who they say they are.',
  },
  kyb: {
    slug: 'kyb',
    label: 'KYB',
    description: 'Confirming a real company, and who actually owns it.',
  },
  aml: {
    slug: 'aml',
    label: 'AML',
    description:
      'Screening against sanctions, PEPs, and adverse media, and watching transactions for money laundering.',
  },
  fraud: {
    slug: 'fraud',
    label: 'Fraud Prevention',
    description: 'Catching the people trying to defraud you before they get through.',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
