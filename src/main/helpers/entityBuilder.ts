import { Product } from '../models/Product';
import { Responsible } from '../models/Responsible';
import { Increment } from '../models/Increment';
import { Model } from '../models/Model';
import { Version } from '../models/Version';

export function buildProductEntity(productData: Product): Product {
  const { name, description, startsAt, endsAt, increments, responsibles } =
    productData;

  const product = new Product();
  product.name = name;
  product.description = description ?? null;
  product.startsAt = startsAt ? new Date(startsAt) : null;
  product.endsAt = endsAt ? new Date(endsAt) : null;

  if (endsAt && startsAt && new Date(endsAt) < new Date(startsAt)) {
    throw new Error('The end date cannot be earlier than the start date.');
  }

  if (increments && increments.length > 0) {
    product.increments = increments.map(
      (incrementData: Increment, index: number) =>
        buildIncrementEntity(incrementData, index),
    );
  } else {
    // " - Baseline" has 11 characters, so product.name should be trimmed accordingly
    const baselineSuffix = ' - Baseline';
    const maxLength = 250;

    let truncatedName = product.name;
    if (product.name.length + baselineSuffix.length > maxLength) {
      truncatedName = product.name.slice(0, maxLength - baselineSuffix.length);
    }

    const incrementData = {
      name: `${truncatedName}${baselineSuffix}`,
    };
    product.increments = [];
    product.increments.push(buildIncrementEntity(incrementData, 0));
  }

  if (responsibles && responsibles.length > 0) {
    product.responsibles = responsibles.map((responsibleData: Responsible) =>
      buildResponsibleEntity(responsibleData),
    );
  }
  return product;
}

export function buildResponsibleEntity(
  responsibleData: Responsible,
): Responsible {
  const { firstName, lastName, role } = responsibleData;

  const responsible = new Responsible();
  responsible.firstName = firstName;
  responsible.lastName = lastName;
  responsible.role = role ?? null;

  return responsible;
}

export function buildIncrementEntity(
  incrementData: any,
  index: number,
): Increment {
  const { name, incrementIndex, models } = incrementData;

  const increment = new Increment();
  increment.name = name;

  if (incrementIndex !== undefined && incrementIndex !== null) {
    increment.incrementIndex = incrementIndex;
  } else {
    increment.incrementIndex = index;
  }

  if (models && models.length > 0) {
    increment.models = models.map((modelData: Model) =>
      buildModelEntity(modelData),
    );
  }
  return increment;
}

export function buildModelEntity(modelData: Model): Model {
  const { name, versions } = modelData;

  const model = new Model();
  model.name = name;
  if (versions && versions.length > 0) {
    model.versions = versions.map((versionData: any, index: number) =>
      buildVersionEntity(versionData, index),
    );
  } else {
    const versionData = {
      payload: '{"cells": []}',
      thumbnail: '',
    };
    model.versions = [];
    model.versions.push(buildVersionEntity(versionData, 0));
  }
  return model;
}

export function buildVersionEntity(versionData: any, index: number): Version {
  const { payload, thumbnail, versionIndex, x, y, height, width } = versionData;

  const version = new Version();

  if (versionIndex !== undefined && versionIndex !== null) {
    version.versionIndex = versionIndex;
  } else {
    version.versionIndex = index;
  }

  version.payload = payload;
  version.thumbnail = thumbnail;
  version.x = x;
  version.y = y;
  version.height = height;
  version.width = width;

  return version;
}
