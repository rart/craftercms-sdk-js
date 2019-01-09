/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Query } from '@craftercms/search';

export const SEARCH = 'CRAFTERCMS_SEARCH';
export const SEARCH_COMPLETE = 'CRAFTERCMS_SEARCH_COMPLETE';

export function search(query: Query) {
  return {
    type: SEARCH,
    payload: query
  }
}

export function searchComplete(searchResponseData: {
  queryId: string,
  response?
}) {
  return {
    type: SEARCH_COMPLETE,
    payload: searchResponseData
  }
}
