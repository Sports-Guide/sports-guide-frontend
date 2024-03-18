export const areasList = (state) => state.area.areasList;
export const areasErrorMessage = (state) => state.area.errorGetAreas;
export const categoryList = (state) => state.area.categoryList;
export const categoryErrorMessage = (state) => state.area.errorGetCategory;
export const addressSelector = (state) => state.area.address;
export const coordinatesSelector = (state) => state.area.coordinates;
export const areasToShowSelector = (state) => state.area.areasToShow;
export const coordsForAreaList = (state) =>
	state.getCoordsForArea.coordsForArea;
export const coordsForAreaErrorMessage = (state) =>
	state.getCoordsForArea.errorCoordsForArea;
export const isAreaAddedStatus = (state) => state.area.isAreaAdded;
export const isAreaAddedError = (state) => state.area.isAreaError;
export const favoriteAreaList = (state) =>
	state.favoriteAreas.favoriteAreasList;
// export const areaIsLiked = (state) => state.favoriteAreas.isLiked;
