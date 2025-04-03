import { Infer } from "convex/values";
import { intervalValidator } from "./constants";
import { Doc } from "@convex-dev/auth/server";

export type Interval = Infer<typeof intervalValidator>;

export type User = Doc<"users"> & {
  avatarUrl?: string;
};

// Define types based on validators
export type Price = {
  id: string;
  priceAmount?: number;
  priceCurrency?: string;
  recurringInterval?: string;
  type: string;
  amountType: string;
};

export type Benefit = {
  id: string;
  description: string;
  type: string;
};

export type Plan = {
  id: string;
  name: string;
  description: string;
  recurringInterval: string;
  isRecurring: boolean;
  prices: Price[];
  benefits: Benefit[];
};

// Product Types
export type ProductMedia = {
  id: string;
  organizationId: string;
  name: string;
  path: string;
  mimeType: string;
  size: number;
  storageVersion: string;
  checksumEtag: string;
  checksumSha256Base64: string;
  checksumSha256Hex: string;
  lastModifiedAt: string;
  version: string;
  service: string;
  isUploaded: boolean;
  createdAt: string;
  sizeReadable: string;
  publicUrl: string;
};

export type CustomFieldProperties = {
  formLabel?: string;
  formHelpText?: string;
  formPlaceholder?: string;
  textarea?: boolean;
  minLength?: number;
  maxLength?: number;
};

export type CustomField = {
  createdAt: string;
  modifiedAt: string;
  id: string;
  metadata: Record<string, any>;
  type: string;
  slug: string;
  name: string;
  organizationId: string;
  properties: CustomFieldProperties;
};

export type AttachedCustomField = {
  customFieldId: string;
  customField: CustomField;
  order: number;
  required: boolean;
};

export type ProductPrice = Price & {
  createdAt: string;
  modifiedAt: string;
  isArchived: boolean;
  productId: string;
  legacy: boolean;
};

export type ProductBenefit = Benefit & {
  createdAt: string;
  modifiedAt: string;
  selectable: boolean;
  deletable: boolean;
  organizationId: string;
  properties: {
    note: string;
  };
  isTaxApplicable: boolean;
};

export type Product = {
  createdAt: string;
  modifiedAt: string;
  id: string;
  name: string;
  description: string;
  recurringInterval: string;
  isRecurring: boolean;
  isArchived: boolean;
  organizationId: string;
  metadata: Record<string, any>;
  prices: ProductPrice[];
  benefits: ProductBenefit[];
  medias: ProductMedia[];
  attachedCustomFields: AttachedCustomField[];
};

export type ProductEvent = {
  type: "product.created";
  data: Product;
};
