
export interface Province {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  provinceId: string;
}

export interface Sector {
  id: string;
  name: string;
  districtId: string;
}

export interface Cell {
  id: string;
  name: string;
  sectorId: string;
}

export interface Village {
  id: string;
  name: string;
  cellId: string;
}

export const provinces: Province[] = [
  { id: 'KT', name: 'Kigali City' },
  { id: 'EP', name: 'Eastern Province' },
  { id: 'NP', name: 'Northern Province' },
  { id: 'SP', name: 'Southern Province' },
  { id: 'WP', name: 'Western Province' },
];

export const districts: District[] = [
  // Kigali City
  { id: 'GA', name: 'Gasabo', provinceId: 'KT' },
  { id: 'KI', name: 'Kicukiro', provinceId: 'KT' },
  { id: 'NY', name: 'Nyarugenge', provinceId: 'KT' },
  
  // Eastern Province
  { id: 'BU', name: 'Bugesera', provinceId: 'EP' },
  { id: 'GA2', name: 'Gatsibo', provinceId: 'EP' },
  { id: 'KA', name: 'Kayonza', provinceId: 'EP' },
  { id: 'KI2', name: 'Kirehe', provinceId: 'EP' },
  { id: 'NG', name: 'Ngoma', provinceId: 'EP' },
  { id: 'NY2', name: 'Nyagatare', provinceId: 'EP' },
  { id: 'RW', name: 'Rwamagana', provinceId: 'EP' },
  
  // Northern Province
  { id: 'BU2', name: 'Burera', provinceId: 'NP' },
  { id: 'GA3', name: 'Gakenke', provinceId: 'NP' },
  { id: 'GA4', name: 'Gicumbi', provinceId: 'NP' },
  { id: 'MU', name: 'Musanze', provinceId: 'NP' },
  { id: 'RU', name: 'Rulindo', provinceId: 'NP' },
  
  // Southern Province
  { id: 'GA5', name: 'Gisagara', provinceId: 'SP' },
  { id: 'HU', name: 'Huye', provinceId: 'SP' },
  { id: 'KA2', name: 'Kamonyi', provinceId: 'SP' },
  { id: 'MU2', name: 'Muhanga', provinceId: 'SP' },
  { id: 'NY3', name: 'Nyamagabe', provinceId: 'SP' },
  { id: 'NY4', name: 'Nyanza', provinceId: 'SP' },
  { id: 'NY5', name: 'Nyaruguru', provinceId: 'SP' },
  { id: 'RU2', name: 'Ruhango', provinceId: 'SP' },
  
  // Western Province
  { id: 'KA3', name: 'Karongi', provinceId: 'WP' },
  { id: 'NY6', name: 'Ngororero', provinceId: 'WP' },
  { id: 'NY7', name: 'Nyabihu', provinceId: 'WP' },
  { id: 'NY8', name: 'Nyamasheke', provinceId: 'WP' },
  { id: 'RU3', name: 'Rubavu', provinceId: 'WP' },
  { id: 'RU4', name: 'Rusizi', provinceId: 'WP' },
  { id: 'RU5', name: 'Rutsiro', provinceId: 'WP' },
];

export const sectors: Sector[] = [
  // Gasabo District sectors (sample)
  { id: 'BI', name: 'Bumbogo', districtId: 'GA' },
  { id: 'GA_GA', name: 'Gasabo', districtId: 'GA' },
  { id: 'GI', name: 'Gikomero', districtId: 'GA' },
  { id: 'GI2', name: 'Gisozi', districtId: 'GA' },
  { id: 'JA', name: 'Jali', districtId: 'GA' },
  { id: 'KI_KI', name: 'Kinyinya', districtId: 'GA' },
  { id: 'ND', name: 'Nduba', districtId: 'GA' },
  { id: 'NE', name: 'Ndera', districtId: 'GA' },
  { id: 'RU_RU', name: 'Rusororo', districtId: 'GA' },
  
  // Kicukiro District sectors (sample)
  { id: 'GA_KI', name: 'Gahanga', districtId: 'KI' },
  { id: 'GA2_KI', name: 'Gatenga', districtId: 'KI' },
  { id: 'KA_KI', name: 'Kagarama', districtId: 'KI' },
  { id: 'KA2_KI', name: 'Kanombe', districtId: 'KI' },
  { id: 'KI_KI2', name: 'Kicukiro', districtId: 'KI' },
  { id: 'KI2_KI', name: 'Kigarama', districtId: 'KI' },
  { id: 'MA', name: 'Masaka', districtId: 'KI' },
  { id: 'NI', name: 'Niboye', districtId: 'KI' },
  { id: 'NY_KI', name: 'Nyarugunga', districtId: 'KI' },
  { id: 'RW_KI', name: 'Rwampara', districtId: 'KI' },
  
  // Add more sectors as needed for other districts
];

export const cells: Cell[] = [
  // Sample cells for Gasabo sector
  { id: 'KA_GA', name: 'Kagugu', sectorId: 'GA_GA' },
  { id: 'KI_GA', name: 'Kimisagara', sectorId: 'GA_GA' },
  { id: 'NY_GA', name: 'Nyarutarama', sectorId: 'GA_GA' },
  
  // Sample cells for Kinyinya sector
  { id: 'GA_KI_KI', name: 'Gacuriro', sectorId: 'KI_KI' },
  { id: 'KA_KI_KI', name: 'Kabuye', sectorId: 'KI_KI' },
  { id: 'KI_KI_KI', name: 'Kinyinya', sectorId: 'KI_KI' },
  
  // Add more cells as needed
];

export const villages: Village[] = [
  // Sample villages for Kagugu cell
  { id: 'KA_KA_GA', name: 'Kagugu I', cellId: 'KA_GA' },
  { id: 'KA2_KA_GA', name: 'Kagugu II', cellId: 'KA_GA' },
  
  // Sample villages for Gacuriro cell
  { id: 'GA_GA_KI', name: 'Gacuriro I', cellId: 'GA_KI_KI' },
  { id: 'GA2_GA_KI', name: 'Gacuriro II', cellId: 'GA_KI_KI' },
  
  // Add more villages as needed
];

export const getDistrictsByProvince = (provinceId: string): District[] => {
  return districts.filter(district => district.provinceId === provinceId);
};

export const getSectorsByDistrict = (districtId: string): Sector[] => {
  return sectors.filter(sector => sector.districtId === districtId);
};

export const getCellsBySector = (sectorId: string): Cell[] => {
  return cells.filter(cell => cell.sectorId === sectorId);
};

export const getVillagesByCell = (cellId: string): Village[] => {
  return villages.filter(village => village.cellId === cellId);
};
