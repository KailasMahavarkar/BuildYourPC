import React from "react";

// image
import logo from "../../../img/logo.png";
// cookies
import { useCookies } from "react-cookie";

export default function Header(props) {
	const [cookies, setCookie, removeCookie] = useCookies();
	const logout = () => {
		setCookie("login_Data", {
			login: false,
			email: null,
		});
	};

	return (
		<header className="header">
			{/* Header Navigation section */}
			<div className="">
				<img
					src={logo}
					alt=""
					style={{
						height: "3rem",
						margin: "1rem",
					}}
				/>
			</div>
			<div className="header__link">
				<a href="#">Home</a>
			</div>
			<div className="header__link">
				<a href="#pcBuilder"> Build Your Own PC</a>
			</div>

			<div className="header__link">
				<a href="#prebuiltpc">Pre-Built PC</a>
			</div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div className="header__link" style={{ fontWeight: "600" }}>
				{cookies.login_Data.login === true ? (
					<span onClick={logout}>{`${cookies.login_Data.email}---LOGOUT`}</span>
				) : (
					<a onClick={() => props.setmodal(true)}>LOGIN</a>
				)}
			</div>
		</header>
	);
}
