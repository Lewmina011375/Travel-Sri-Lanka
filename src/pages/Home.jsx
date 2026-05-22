import Hero from '../components/Hero';
import About from '../components/About';
import PlacesSection from '../components/PlacesSection';
import HotelSection from '../components/HotelSection';
import VehicleSection from '../components/VehicleSection';
import Testimonials from '../components/Testimonials';

export default function Home() {
	return (
		<>
			<Hero />
			<About />
			<PlacesSection />
			<HotelSection />
			<VehicleSection />
			<Testimonials />
		</>
	);
}
