/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

import { ContentInstance } from '@craftercms/models';

declare namespace window {
  const crafterRequire: Function;
}

let repaintPencilsTimeout;

export interface UseICEConfig {
  model: ContentInstance;
  parentModelId?: string;
  label: string;
  group: string;
  isAuthoring: boolean;
}

export interface UseDropZoneConfig {
  model: ContentInstance;
  zoneName: string;
  contentTypeId: string;
  isAuthoring: boolean;
}

export interface ICEAttributes {
  'data-studio-ice': string;
  'data-studio-ice-path': string;
  'data-studio-ice-label': string;
  'data-studio-component': string;
  'data-studio-component-path': string;
  'data-studio-embedded-item-id'?: string;
}

export interface DropZoneAttributes {
  'data-studio-components-target': string,
  'data-studio-components-objectid': string,
  'data-studio-zone-content-type': string
}

export function getICEAttributes(config: UseICEConfig): ICEAttributes {

  const {
    model,
    parentModelId = null,
    label = '',
    isAuthoring = true,
    group = ''
  } = config;

  if (!isAuthoring) {
    return ({ } as ICEAttributes);
  }

  const isEmbedded = model?.craftercms.path == null;
  const path = model?.craftercms.path ?? parentModelId;
  const modelId = model?.craftercms.id;
  return {
    ...isEmbedded ? { 'data-studio-embedded-item-id': modelId } : {},
    'data-studio-ice': group,
    'data-studio-ice-path': path,
    'data-studio-ice-label': label,
    'data-studio-component': path,
    'data-studio-component-path': path
  };

}

export function getDropZoneAttributes(config: UseDropZoneConfig) {

  const { model, zoneName, contentTypeId, isAuthoring = true } = config;

  if (!isAuthoring) {
    return ({ } as DropZoneAttributes);
  }

  const modelId = model?.craftercms.id;
  return {
    'data-studio-components-target': zoneName,
    'data-studio-components-objectid': modelId,
    'data-studio-zone-content-type': contentTypeId
  };

}

export function repaintPencils(): void {
  clearTimeout(repaintPencilsTimeout);
  repaintPencilsTimeout = setTimeout(() => {
    window.crafterRequire?.(['guest'], function ({ iceRepaint }) {
      iceRepaint();
    });
  }, 200);
}

export function fetchIsPreview(): Promise<boolean> {
  return fetch('/api/1/config/preview.json')
    .then((response) => response.json())
    .then((response) => response.preview);
}
