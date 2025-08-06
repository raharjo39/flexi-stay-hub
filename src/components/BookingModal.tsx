
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CreditCard, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  apartment: {
    id: number;
    name: string;
    type: string;
    price: number;
    priceType: string;
    capacity: number;
    amenities: string[];
  };
  onClose: () => void;
}

const BookingModal = ({ apartment, onClose }: BookingModalProps) => {
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkInTime: '14:00',
    duration: '4',
    guests: '1',
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });

  const durationOptions = [
    { value: '4', label: '4 Jam', price: apartment.price },
    { value: '8', label: '8 Jam', price: apartment.price * 1.8 },
    { value: '12', label: '12 Jam', price: apartment.price * 2.5 },
    { value: '24', label: '1 Hari (24 Jam)', price: apartment.price * 4 }
  ];

  const selectedDuration = durationOptions.find(d => d.value === bookingData.duration);
  const totalPrice = selectedDuration?.price || apartment.price;

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    // Validate required fields
    if (!bookingData.checkInDate || !bookingData.customerName || !bookingData.customerPhone) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking success
    toast({
      title: "Booking Berhasil!",
      description: `Booking untuk ${apartment.name} telah dikonfirmasi. Kode akses akan dikirim ke WhatsApp Anda.`,
    });

    // Show success modal or redirect
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Booking {apartment.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Apartment Info */}
          <div className="bg-secondary p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{apartment.name}</h3>
                <p className="text-sm text-muted-foreground">{apartment.type}</p>
              </div>
              <Badge>Tersedia</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>Maksimal {apartment.capacity} tamu</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkInDate">Tanggal Check-in *</Label>
              <Input
                id="checkInDate"
                type="date"
                value={bookingData.checkInDate}
                onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="checkInTime">Waktu Check-in</Label>
              <Input
                id="checkInTime"
                type="time"
                value={bookingData.checkInTime}
                onChange={(e) => handleInputChange('checkInTime', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Durasi Sewa</Label>
              <Select value={bookingData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} - Rp {option.price.toLocaleString('id-ID')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="guests">Jumlah Tamu</Label>
              <Select value={bookingData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: apartment.capacity }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} orang
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Informasi Pemesan</h4>
            <div>
              <Label htmlFor="customerName">Nama Lengkap *</Label>
              <Input
                id="customerName"
                value={bookingData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Nomor WhatsApp *</Label>
              <Input
                id="customerPhone"
                value={bookingData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={bookingData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-secondary p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span>Durasi:</span>
              <span>{selectedDuration?.label}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Harga:</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Pembayaran:</span>
                <span className="text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Batal
            </Button>
            <Button onClick={handleBooking} className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Lanjut Pembayaran
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
