import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white p-2 md:p-4 gap-2 md:gap-4">
			<Sidebar className="w-full md:w-1/4 bg-gray-800 shadow-lg" />
			<MessageContainer className="flex-1 bg-gray-900 shadow-lg" />
		</div>
	);
};

export default Home;
