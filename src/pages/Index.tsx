
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Wifi, Car, Coffee } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

const Index = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const apartments = [
    {
      id: 1,
      name: "Studio Margonda 1",
      type: "Studio",
      price: 150000,
      priceType: "per 4 hours",
      image: "/placeholder.svg",
      available: true,
      amenities: ["WiFi", "AC", "TV", "Kitchen", "Parking"],
      capacity: 2,
      description: "Cozy studio apartment perfect for short stays"
    },
    {
      id: 2,
      name: "Deluxe Margonda 2",
      type: "1 Bedroom",
      price: 250000,
      priceType: "per 4 hours",
      image: "/placeholder.svg",
      available: true,
      amenities: ["WiFi", "AC", "TV", "Kitchen", "Parking", "Balcony"],
      capacity: 4,
      description: "Spacious one-bedroom with modern amenities"
    },
    {
      id: 3,
      name: "Premium Margonda 3",
      type: "2 Bedroom",
      price: 400000,
      priceType: "per 4 hours",
      image: "/placeholder.svg",
      available: false,
      amenities: ["WiFi", "AC", "TV", "Kitchen", "Parking", "Balcony", "Gym Access"],
      capacity: 6,
      description: "Luxury two-bedroom apartment with premium facilities"
    }
  ];

  const handleBookNow = (apartment) => {
    setSelectedApartment(apartment);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">FlexiStay Hub</h1>
          <p className="text-xl mb-8 opacity-90">Sewa apartemen fleksibel mulai dari beberapa jam</p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Booking Fleksibel</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Lokasi Strategis</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>Self Check-in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Apartments Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Unit Tersedia</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment) => (
            <Card key={apartment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={apartment.image} 
                  alt={apartment.name}
                  className="w-full h-48 object-cover"
                />
                {!apartment.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Sedang Terisi</Badge>
                  </div>
                )}
                {apartment.available && (
                  <Badge className="absolute top-2 right-2 bg-green-500">Tersedia</Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{apartment.name}</CardTitle>
                    <CardDescription>{apartment.type}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      Rp {apartment.price.toLocaleString('id-ID')}
                    </div>
                    <div className="text-sm text-muted-foreground">{apartment.priceType}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{apartment.description}</p>
                
                <div className="flex items-center mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">Kapasitas: {apartment.capacity} orang</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {apartment.amenities.slice(0, 4).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {apartment.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{apartment.amenities.length - 4} lainnya
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={!apartment.available}
                  onClick={() => handleBookNow(apartment)}
                >
                  {apartment.available ? 'Pesan Sekarang' : 'Sedang Terisi'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Pilih FlexiStay?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Booking Fleksibel</h3>
              <p className="text-muted-foreground">Sewa mulai dari beberapa jam hingga harian sesuai kebutuhan</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self Check-in</h3>
              <p className="text-muted-foreground">Akses kamar otomatis dengan kode PIN setelah pembayaran</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fasilitas Lengkap</h3>
              <p className="text-muted-foreground">Apartemen dengan fasilitas modern dan lokasi strategis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && selectedApartment && (
        <BookingModal 
          apartment={selectedApartment}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
};

export default Index;
