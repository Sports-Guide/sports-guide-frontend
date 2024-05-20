import { RootState } from '../store';

export const areasList = (state: RootState) => state.area.areasList;
export const areasErrorMessage = (state: RootState) => state.area.errorGetAreas;
export const categoryList = (state: RootState) => state.area.categoryList;
export const categoryErrorMessage = (state: RootState) =>
	state.area.errorGetCategory;
export const addressSelector = (state: RootState) => state.area.address;
export const coordinatesSelector = (state: RootState) => state.area.coordinates;
export const areasToShowSelector = (state: RootState) => state.area.areasToShow;
export const coordsForAreaList = (state: RootState) =>
	state.getCoordsForArea.coordsForArea;
export const coordsForAreaErrorMessage = (state: RootState) =>
	state.getCoordsForArea.errorCoordsForArea;
export const isAreaAddedStatus = (state: RootState) => state.area.isAreaAdded;
export const isAreaAddedError = (state: RootState) => state.area.isAreaError;
export const favoriteAreaList = (state: RootState) =>
	state.favoriteAreas.favoriteAreasList;
