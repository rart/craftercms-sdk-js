/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

import { Observable } from 'rxjs';

import { crafterConf, SDKService } from '@craftercms/classes';
import { CrafterConfig } from '@craftercms/models';
import { composeUrl } from '@craftercms/utils';

// TODO: Add correct return types
type ToDoGetNavTreeReturnType = Observable<any>;
type ToDoGetNavBreadcrumbReturnType = Observable<any>;

/**
 * Returns the navigation tree with the specified depth for the specified store URL.
 * @param {string} path - the root folder of the tree
 * @param {int} depth - the depth of the tree
 * @param {string} currentPageUrl - the URL of the current page
 */
export function getNavTree(path: string): ToDoGetNavTreeReturnType;
export function getNavTree(path: string, depth: number): ToDoGetNavTreeReturnType;
export function getNavTree(path: string, depth: number, currentPageUrl: string): ToDoGetNavTreeReturnType;
export function getNavTree(path: string, depth: number, currentPageUrl: string, config: CrafterConfig): ToDoGetNavTreeReturnType;
export function getNavTree(path: string, depth: number = 1, currentPageUrl: string = '', config?: CrafterConfig): ToDoGetNavTreeReturnType {
  config = crafterConf.mix(config);
  const requestURL = composeUrl(config, config.endpoints.GET_NAV_TREE);
  return SDKService.httpGet(requestURL, {
    crafterSite: config.site,
    currentPageUrl,
    url: path,
    depth
  });
}

/**
 * Returns the navigation items that form the breadcrumb for the specified store URL.
 * @param {string} path - the current URL used to build the breadcrumb
 * @param {string} root - the root URL, basically the starting point of the breadcrumb
 */
export function getNavBreadcrumb(path: string): ToDoGetNavBreadcrumbReturnType;
export function getNavBreadcrumb(path: string, root: string): ToDoGetNavBreadcrumbReturnType;
export function getNavBreadcrumb(path: string, root: string, config: CrafterConfig): ToDoGetNavBreadcrumbReturnType;
export function getNavBreadcrumb(path: string, root: string = '', config?: CrafterConfig): ToDoGetNavBreadcrumbReturnType {
  config = crafterConf.mix(config);
  const requestURL = composeUrl(config, config.endpoints.GET_BREADCRUMB);
  return SDKService.httpGet(requestURL, {
    crafterSite: config.site,
    url: path,
    root
  });
}

/**
 * Navigation Service API
 */
export const NavigationService = {
  getNavTree,
  getNavBreadcrumb
};

export default NavigationService;
