
import { useState, useCallback } from 'react';
import {
  provinces,
  getDistrictsByProvince,
  getSectorsByDistrict,
  getCellsBySector,
  getVillagesByCell,
  type Province,
  type District,
  type Sector,
  type Cell,
  type Village,
} from '@/lib/data/rwanda-admin';

export interface RwandaAddress {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}

export function useRwandaAddress() {
  const [address, setAddress] = useState<RwandaAddress>({
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
  });

  const [availableDistricts, setAvailableDistricts] = useState<District[]>([]);
  const [availableSectors, setAvailableSectors] = useState<Sector[]>([]);
  const [availableCells, setAvailableCells] = useState<Cell[]>([]);
  const [availableVillages, setAvailableVillages] = useState<Village[]>([]);

  const setProvince = useCallback((provinceId: string) => {
    const districts = getDistrictsByProvince(provinceId);
    setAddress(prev => ({
      ...prev,
      province: provinceId,
      district: '',
      sector: '',
      cell: '',
      village: '',
    }));
    setAvailableDistricts(districts);
    setAvailableSectors([]);
    setAvailableCells([]);
    setAvailableVillages([]);
  }, []);

  const setDistrict = useCallback((districtId: string) => {
    const sectors = getSectorsByDistrict(districtId);
    setAddress(prev => ({
      ...prev,
      district: districtId,
      sector: '',
      cell: '',
      village: '',
    }));
    setAvailableSectors(sectors);
    setAvailableCells([]);
    setAvailableVillages([]);
  }, []);

  const setSector = useCallback((sectorId: string) => {
    const cells = getCellsBySector(sectorId);
    setAddress(prev => ({
      ...prev,
      sector: sectorId,
      cell: '',
      village: '',
    }));
    setAvailableCells(cells);
    setAvailableVillages([]);
  }, []);

  const setCell = useCallback((cellId: string) => {
    const villages = getVillagesByCell(cellId);
    setAddress(prev => ({
      ...prev,
      cell: cellId,
      village: '',
    }));
    setAvailableVillages(villages);
  }, []);

  const setVillage = useCallback((villageId: string) => {
    setAddress(prev => ({
      ...prev,
      village: villageId,
    }));
  }, []);

  return {
    address,
    provinces,
    availableDistricts,
    availableSectors,
    availableCells,
    availableVillages,
    setProvince,
    setDistrict,
    setSector,
    setCell,
    setVillage,
  };
}
