
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRwandaAddress } from "@/hooks/useRwandaAddress";

interface AddressFormProps {
  onAddressChange: (address: {
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
  }) => void;
}

export function AddressForm({ onAddressChange }: AddressFormProps) {
  const {
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
  } = useRwandaAddress();

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    onAddressChange({ ...address, province: value, district: '', sector: '', cell: '', village: '' });
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    onAddressChange({ ...address, district: value, sector: '', cell: '', village: '' });
  };

  const handleSectorChange = (value: string) => {
    setSector(value);
    onAddressChange({ ...address, sector: value, cell: '', village: '' });
  };

  const handleCellChange = (value: string) => {
    setCell(value);
    onAddressChange({ ...address, cell: value, village: '' });
  };

  const handleVillageChange = (value: string) => {
    setVillage(value);
    onAddressChange({ ...address, village: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <div className="space-y-2">
        <Label htmlFor="province">Province</Label>
        <Select value={address.province} onValueChange={handleProvinceChange}>
          <SelectTrigger id="province">
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.id} value={province.id}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">District</Label>
        <Select 
          value={address.district} 
          onValueChange={handleDistrictChange}
          disabled={!address.province}
        >
          <SelectTrigger id="district">
            <SelectValue placeholder="Select district" />
          </SelectTrigger>
          <SelectContent>
            {availableDistricts.map((district) => (
              <SelectItem key={district.id} value={district.id}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sector">Sector</Label>
        <Select 
          value={address.sector} 
          onValueChange={handleSectorChange}
          disabled={!address.district}
        >
          <SelectTrigger id="sector">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            {availableSectors.map((sector) => (
              <SelectItem key={sector.id} value={sector.id}>
                {sector.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cell">Cell</Label>
        <Select 
          value={address.cell} 
          onValueChange={handleCellChange}
          disabled={!address.sector}
        >
          <SelectTrigger id="cell">
            <SelectValue placeholder="Select cell" />
          </SelectTrigger>
          <SelectContent>
            {availableCells.map((cell) => (
              <SelectItem key={cell.id} value={cell.id}>
                {cell.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="village">Village</Label>
        <Select 
          value={address.village} 
          onValueChange={handleVillageChange}
          disabled={!address.cell}
        >
          <SelectTrigger id="village">
            <SelectValue placeholder="Select village" />
          </SelectTrigger>
          <SelectContent>
            {availableVillages.map((village) => (
              <SelectItem key={village.id} value={village.id}>
                {village.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
