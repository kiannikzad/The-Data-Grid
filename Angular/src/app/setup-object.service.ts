import { Injectable } from '@angular/core';

export const IDX_OF_FEATURES_ARR = 0;
export const IDX_OF_GLOBAL_ITEM_IDX = 1;

export const IDX_OF_ID_COL_IDXS = 0;
export const IDX_OF_ID_ITEM_IDXS = 1;
export const IDX_OF_NON_ID_COL_IDXS = 2;
export const IDX_OF_NON_ID_ITEM_IDXS = 3;

export const IDX_OF_OBSERVATION_COL_IDXS = 0;
export const IDX_OF_ATTRIBUTE_COL_IDXS = 1;
export const IDX_OF_ITEM_IDX = 2;

@Injectable({
  providedIn: 'root'
})
export class SetupObjectService {

  constructor() { }

  /* ////////////////////////////////////
     getRootFeatures(setupObject)

     params: setupObject

     returns: array containing objects with the following format:
        {
          name: string,   //feature name
          index: number                           //index in setupObject's 'features' array
        }
  */////////////////////////////////////////
  getRootFeatures(setupObject) {
    let rootFeatures = []
    for (let j = 0; j < setupObject.subfeatureStartIndex; j++) {
      rootFeatures.push({
        name: setupObject.features[setupObject.children[IDX_OF_FEATURES_ARR][j]].frontendName,
        index: j
      });
    }
    return rootFeatures;
  }

  /* ////////////////////////////////////
    getFeaturesToChildren(setupObject)

    params: setupObject

    returns: object that maps a feature's index in the setupObject 
      'features' array to the feature's subfeature indices. example:
       {
         1: [2,3,4],   //feature 1 has subfeatures 2, 3, and 4
       }
 */////////////////////////////////////////
  getFeaturesToChildren(setupObject) {
    let featuresToChildren = {}
    setupObject.features.forEach((feature, index) => {
      // map index to the feature's children
      featuresToChildren[index] = feature.featureChildren;
    });
    return featuresToChildren;
  }

  getGlobalSelectors(setupObject, appliedFilterSelections, defaultColumns) {
    let globalItemIndex = setupObject.children[IDX_OF_GLOBAL_ITEM_IDX];
    let globalColumns = [];
    let path = [IDX_OF_GLOBAL_ITEM_IDX];

    this.getAllItemRelatedColumns(setupObject.items[globalItemIndex], globalColumns, path, setupObject);

    return this.parseColumns(globalColumns, appliedFilterSelections, defaultColumns);
  }


  private getAllItemRelatedColumns(item, columns, path, setupObject) {
    item.children[IDX_OF_ID_COL_IDXS].forEach((IDColumnIndex, i) => {
      let newPath = Object.assign([], path);
      newPath.push(IDX_OF_ID_COL_IDXS, i);
      columns.push({
        column: setupObject.columns[IDColumnIndex],
        returnableID: this.getReturnableID(newPath, setupObject)
      });
    });
    item.children[IDX_OF_ID_ITEM_IDXS].forEach((itemPointer, i) => {
      let newPath = Object.assign([], path);
      newPath.push(IDX_OF_ID_ITEM_IDXS, i);
      console.log(itemPointer.index + " ID " + itemPointer.frontendName)
      let itemIndex = itemPointer.index;
      this.getAllItemRelatedColumns(setupObject.items[itemIndex], columns, newPath, setupObject);
    });
    item.children[IDX_OF_NON_ID_COL_IDXS].forEach((NonIDColumnIndex, i) => {
      let newPath = Object.assign([], path);
      newPath.push(IDX_OF_NON_ID_COL_IDXS, i);
      columns.push({
        column: setupObject.columns[NonIDColumnIndex],
        returnableID: this.getReturnableID(newPath, setupObject)
      });
    });
    item.children[IDX_OF_NON_ID_ITEM_IDXS].forEach((itemPointer, i) => {
      let newPath = Object.assign([], path);
      newPath.push(IDX_OF_NON_ID_ITEM_IDXS, i);
      console.log(itemPointer.index + " NON id " + itemPointer.frontendName)
      let itemIndex = itemPointer.index;
      this.getAllItemRelatedColumns(setupObject.items[itemIndex], columns, newPath, setupObject);
    });
  }

  getFeatureSelectors(setupObject, appliedFilterSelections, defaultColumns) {
    let allFeatureSelectors = [];
    // for each feature
    setupObject.children[IDX_OF_FEATURES_ARR].forEach((featureIndex, k) => {
      let featureColumns = [];
      console.log(setupObject.features[featureIndex].frontendName)
      // find feature's observation columns
      setupObject.features[featureIndex].children[IDX_OF_OBSERVATION_COL_IDXS].forEach((observationColumnIndex, i) => {
        featureColumns.push({
          column: setupObject.columns[observationColumnIndex],
          returnableID: this.getReturnableID([IDX_OF_FEATURES_ARR, k, IDX_OF_OBSERVATION_COL_IDXS, i], setupObject)
        });
      });
      // find feature's attribute columns
      setupObject.features[featureIndex].children[IDX_OF_ATTRIBUTE_COL_IDXS].forEach((attributeColumnIndex, i) => {
        featureColumns.push({
          column: setupObject.columns[attributeColumnIndex],
          returnableID: this.getReturnableID([IDX_OF_FEATURES_ARR, k, IDX_OF_ATTRIBUTE_COL_IDXS, i], setupObject)
        });
      });
      allFeatureSelectors[featureIndex] = this.parseColumns(featureColumns,
        appliedFilterSelections,
        defaultColumns);
    });
    return allFeatureSelectors;
  }



  // returns an array that holds key-value mapping from feature's index in setupObj featrues array to its input selectors
  getFeatureInputSelectors(setupObject, appliedFilterSelections, defaultColumns, isObservation: boolean) {
    let childType;
    isObservation ? childType = IDX_OF_OBSERVATION_COL_IDXS : childType = IDX_OF_ATTRIBUTE_COL_IDXS;

    let allFeatureInputSelectors = [];
    // for each feature
    setupObject.children[IDX_OF_FEATURES_ARR].forEach((featureIndex, k) => {
      let featureColumns = [];
      console.log(setupObject.features[featureIndex].frontendName)
      // find feature's observation or attribute columns
      setupObject.features[featureIndex].children[childType].forEach((columnIndex, i) => {
        featureColumns.push({
          column: setupObject.columns[columnIndex],
          returnableID: this.getReturnableID([IDX_OF_FEATURES_ARR, k, childType, i], setupObject)
        });
      });
      allFeatureInputSelectors[featureIndex] = this.parseColumns(featureColumns,
        appliedFilterSelections,
        defaultColumns);
    });
    return allFeatureInputSelectors;
  }


  /* ////////////////////////////////////
    getFeatureItemChildren(setupObject, featureIndex)

    params: 
      setupObject, 
      featureIndex: the feature's index of the setupObject.features array

    returns: array of the feature's item children. each element is an itemChildNodePointerObject
    see api spec for more info on itemChildNodePointerObject.
 */////////////////////////////////////////
  getFeatureItemChildren(setupObject, featureIndex) {
    let itemIndex = setupObject.features[featureIndex].children[IDX_OF_ITEM_IDX];
    return setupObject.items[itemIndex].children[IDX_OF_ID_ITEM_IDXS];
  }

  private getReturnableID(tree: any[], setupObject): string {
    let treeID = tree.join('>');
    return setupObject.treeIDToReturnableID[treeID];
  }

  private parseColumns(infos, appliedFilterSelections, defaultColumns): any {
    let selectors = {
      numericChoice: [],
      numericEqual: [],
      calendarRange: [],
      calendarEqual: [],
      dropdown: [],
      searchableDropdown: [],
      checklistDropdown: [],
      searchableChecklistDropdown: [],
      text: [],
      bool: [],
      _placeholder: "placeholder"
    };

    infos.forEach(info => {
      if (info.column.filterSelector) {
        //by default, returnableID to user's input
        //range and multiselect selectors have different format for recording 
        appliedFilterSelections[info.returnableID] = null;

        switch (info.column.filterSelector.selectorKey) {
          case "dropdown": { selectors.dropdown.push(info); break; }
          case "numericEqual": { selectors.numericEqual.push(info); break; }
          case "numericChoice": {
            selectors.numericChoice.push(info);
            appliedFilterSelections[info.returnableID] = { relation: null, value: null }; break;
          }
          case "calendarRange": {
            selectors.calendarRange.push(info);
            appliedFilterSelections[info.returnableID] = { start: null, end: null }; break;
          }
          case "calendarEqual": { selectors.calendarEqual.push(info); break; }
          case "searchableDropdown": {
            selectors.searchableDropdown.push(info);
            appliedFilterSelections[info.returnableID] = []; break;
          }
          case "checklistDropdown": {
            selectors.checklistDropdown.push(info);
            appliedFilterSelections[info.returnableID] = []; break;
          }
          case "searchableChecklistDropdown": {
            selectors.searchableChecklistDropdown.push(info);
            appliedFilterSelections[info.returnableID] = []; break;
          }
          case "text": { selectors.text.push(info); break; }
          case "bool": { selectors.bool.push(info); break; }
        }
      }
      if (info.column.default) {
        defaultColumns.push(info.column.returnableID);
      }
    });
    return selectors;
  }
}
