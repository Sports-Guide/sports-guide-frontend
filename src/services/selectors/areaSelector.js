export const areasList = (state) => state.getAreas.areasList;
export const areasErrorMessage = (state) => state.getAreas.errorGetAreas;
export const categoryList = (state) => state.getCategory.categoryList;
export const categoryErrorMessage = (state) =>
	state.getCategory.errorGetCategory;
export const addressSelector = (state) => state.area.address;
export const coordinatesSelector = (state) => state.area.coordinates;
export const areasToShowSelector = (state) => state.area.areasToShow;
export const coordsForAreaList = (state) =>
	state.getCoordsForArea.coordsForArea;
export const coordsForAreaErrorMessage = (state) =>
	state.getCoordsForArea.errorCoordsForArea;
export const isAreaAddedStatus = (state) => state.area.isAreaAdded;
export const isAreaAddedError = (state) => state.area.isAreaError;
