import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = ({ className }) => {
	return (
		<div className={`p-2 md:p-4 flex flex-col gap-2 md:gap-4 ${className}`}>
			<SearchInput />
			<hr className="border-gray-700 my-2 md:my-4" />
			<Conversations />
			<LogoutButton />
		</div>
	);
};

export default Sidebar;
