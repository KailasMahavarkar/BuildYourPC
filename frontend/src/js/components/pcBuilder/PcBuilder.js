import React, { useState, useEffect } from "react";
import Checkout from "../checkout/Checkout";
import Guide from "../guide/Guide";
import {
	fetchRAM,
	fetchProcessor,
	fetchMotherboard,
	fetchPowersupply,
	fetchSSD,
	fetchGPU,
	fetchMONITOR,
	fetchCABINETS,
} from "../../apis/functions";
import { useCookies } from "react-cookie";
// searches
import Search from "../search/Search";

export default function PcBuilder() {
	// login variable
	const [LOGGEDIN, setLOGGEDIN] = useState(false);
	// data
	const [RAM, setRAM] = useState();
	const [GRAPHICS, setGRAPHICS] = useState();
	const [MONITOR, setMONITOR] = useState();
	const [MOTHERBOARD, setMOTHERBOARD] = useState();
	const [PROCESSOR, setPROCESSOR] = useState();
	const [SSD, setSSD] = useState();
	const [POWER, setPOWER] = useState();
	const [CABINETS, setCABINETS] = useState();
	// process variables
	const [Scabinet, setScabinet] = useState(1);
	const [Sgraphics, setSgraphics] = useState(1);
	const [Smonitor, setSmonitor] = useState(1);
	const [Smotherboard, setSmotherboard] = useState(1);
	const [Spower, setSpower] = useState(1);
	const [Sprocessor, setSprocessor] = useState(1);
	const [Sram, setSram] = useState(1);
	const [Sstorage, setSstorage] = useState(1);

	const [step, setStep] = useState(0);
	const [selectedProducts, setSelectedProducts] = useState({});
	const [progress, setProgress] = useState([0]);
	const [amount, setAmount] = useState(0);

	// cookie
	const [cookies, setCookie, removeCookie] = useCookies();

	useEffect(() => {
		if (step === 9) {
			let total = 0;
			Object.keys(selectedProducts).forEach((key) => {
				total += parseInt(String(selectedProducts[key].price).replace(",", ""));
			});
			setAmount(total);
		}
	}, [step, selectedProducts]);
	useEffect(() => {
		if (cookies.login_Data.login === true) {
			setLOGGEDIN(true);
		}
		// setCookie("login");
		async function xyz() {
			setRAM(await fetchRAM());
			setGRAPHICS(await fetchGPU());
			setMONITOR(await fetchMONITOR());
			setMOTHERBOARD(await fetchMotherboard());
			setPROCESSOR(await fetchProcessor());
			setSSD(await fetchSSD());
			setPOWER(await fetchPowersupply());
			setCABINETS(await fetchCABINETS());
		}
		xyz();
	}, []);
	return (
		<div className="pcBuilder">
			{/* left */}
			<div className="pcBuilder__left">
				<div className="inside-left">
					<button
						
						onClick={() => setStep(1)}
					>
						SELECT PROCESSOR
					</button>
					<button
						
						onClick={() => {
							progress.includes(1)
								? setStep(2)
								: setStep(Math.max(1, ...progress));
						}}
					>
						SELECT MOTHERBOARD
					</button>
					<button
						
						onClick={() =>
							progress.includes(2)
								? setStep(3)
								: setStep(Math.max(1, ...progress))
						}
					>
						SELECT RAM
					</button>
					<button
						
						onClick={() =>
							progress.includes(3)
								? setStep(4)
								: setStep(Math.max(1, ...progress))
						}
					>
						SELECT STORAGE{" "}
					</button>
					<button
						onClick={() =>
							progress.includes(4)
								? setStep(5)
								: setStep(Math.max(1, ...progress))
						}
					>
						SELECT CABINET
					</button>
					<button
						onClick={() =>
							progress.includes(5)
								? setStep(6)
								: setStep(Math.max(1, ...progress))
						}
					>
						SELECT GRAPHICS CARD
					</button>
					<button
						
						onClick={() =>
							progress.includes(6)
								? setStep(7)
								: setStep(Math.max(1, ...progress))
						}
					>
						SELECT POWER SUPPLY UNIT
					</button>
					<button
						
						onClick={() => {
							progress.includes(7)
								? setStep(8)
								: setStep(Math.max(1, ...progress));
						}}
					>
						SELECT MONITOR
					</button>
					<button
						
						onClick={() =>
							progress.includes(8)
								? setStep(9)
								: setStep(Math.max(1, ...progress))
						}
					>
						CHECKOUT
					</button>
				</div>
			</div>
			{/* left ends */}
			<div className="pcBuilder__right">
				{step === 0 ? <Guide setstep={() => setStep(1)} /> : null}
				{step === 1 ? (
					<div className="section_container">
						{/* <h3 className="  textAlignCenter">SELECT PROCESSOR</h3> */}
						<Search set={setPROCESSOR} str="searchProcessor" placeholder="Search Processor ...."/>
						<div className="product_display">
							{Object.keys(PROCESSOR)
								.slice(0, Sprocessor * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("processor") &&
											PROCESSOR[key].name === selectedProducts.processor.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts.processor = {
												...PROCESSOR[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(1);
											setProgress(progress);
											setStep(2);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${PROCESSOR[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>
										<p>{PROCESSOR[key].name}</p>
										<p>₹{PROCESSOR[key].price}</p>
									</div>
								))}
						</div>
						<div className=" textAlignCenter">
							<button
								className="loadmore"
								onClick={() => setSprocessor(Sprocessor + 1)}
							>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}
				{step === 2 ? (
					<div className="section_container">
						{/* <h1 className="  textAlignCenter">SELECT MOTHERBOARD</h1> */}
						<Search set={setMOTHERBOARD} str="searchMotherboard" placeholder="Search Motherboard ...." />

						<div className="product_display">
							{Object.keys(MOTHERBOARD)
								.filter((mb) => {
									if (
										selectedProducts.processor.motherboard.includes(
											MOTHERBOARD[mb].name
										)
									) {
										return true;
									}
									return false;
								})
								.slice(0, Smotherboard * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("motherboard") &&
											MOTHERBOARD[key].name ===
												selectedProducts.motherboard.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts["motherboard"] = {
												...MOTHERBOARD[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(2);
											setProgress(progress);
											setStep(3);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${MOTHERBOARD[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>
										<p>{MOTHERBOARD[key].name}</p>
										<p>₹{MOTHERBOARD[key].price}</p>
									</div>
								))}
						</div>
						<div className=" textAlignCenter">
							<button
								className="loadmore"
								onClick={() => setSmotherboard(Smotherboard + 1)}
							>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}
				{step === 3 ? (
					<div className="section_container">
						{/* <h1 className="  textAlignCenter">SELECT RAM</h1> */}
						<Search set={setRAM} str="searchRAM" placeholder="Search RAM .... "/>

						<div className="product_display">
							{Object.keys(RAM)
								.slice(0, Sram * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("ram") &&
											RAM[key].name === selectedProducts.ram.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts["ram"] = {
												name: RAM[key],
												...RAM[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(3);
											setProgress(progress);
											setStep(4);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${RAM[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>
										<p>{RAM[key].name}</p>
										<p>₹{RAM[key].price}</p>
									</div>
								))}
						</div>
						<div className=" textAlignCenter">
							<button className="  loadmore " onClick={() => setSram(Sram + 1)}>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}
				{step === 4 ? (
					<div className="section_container">
						{/* <h1 className="textAlignCenter">SELECT STORAGE</h1> */}
						<Search set={setSSD} str="searchSSD" placeholder="Search SSD ...." />

						<div className="product_display">
							{Object.keys(SSD)
								.slice(0, Sstorage * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("storage") &&
											SSD[key].name === selectedProducts.storage.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts["storage"] = {
												...SSD[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(4);
											setProgress(progress);
											setStep(5);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${SSD[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>
										<p>{SSD[key].name}</p>
										<p>₹{SSD[key].price}</p>
									</div>
								))}
						</div>
						<div className="textAlignCenter">
							<button
								className="loadmore"
								onClick={() => setSstorage(Sstorage + 1)}
							>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}
				{step === 5 ? (
					<div className="section_container">
						{/* <h1 className="textAlignCenter">SELECT CABINET</h1> */}
						<Search set={setCABINETS} str="searchCABINET" placeholder="Search Cabinet ...." />
						<div className="product_display">
							{Object.keys(CABINETS)
								.slice(0, Scabinet * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("cabinet") &&
											CABINETS[key].name === selectedProducts.cabinet.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts["cabinet"] = {
												...CABINETS[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(5);
											setProgress(progress);
											setStep(6);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${CABINETS[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>
										<p>{CABINETS[key].name}</p>
										<p>₹{CABINETS[key].price}</p>
									</div>
								))}
						</div>
						<div className=" textAlignCenter">
							<button
								className="loadmore"
								onClick={() => setScabinet(Scabinet + 1)}
							>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}

				{step === 6 ? (
					<div className="section_container">
						{/* <h1 className="textAlignCenter">SELECT GRAPHICS CARD</h1> */}
						<Search set={setGRAPHICS} str="searchGPU" placeholder="Search GPU ...." />

						<div className="product_display">
							{Object.keys(GRAPHICS)
								.slice(0, Sgraphics * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("graphics") &&
											GRAPHICS[key].name === selectedProducts.graphics.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts["graphics"] = {
												...GRAPHICS[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(6);
											setProgress(progress);
											setStep(7);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${GRAPHICS[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>
										<p>{GRAPHICS[key].name}</p>
										<p>₹{GRAPHICS[key].price}</p>
									</div>
								))}
						</div>
						<div className=" textAlignCenter">
							<button
								className="loadmore "
								onClick={() => setSgraphics(Sgraphics + 1)}
							>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}
				{step === 7 ? (
					<div className="section_container">
						{/* <h1 className="  textAlignCenter">SELECT POWER SUPPLY UNIT</h1> */}
						<Search set={setPOWER} str="searchPowersupply" placeholder="Search Powersupply ...." />

						<div className="product_display">
							{Object.keys(POWER)
								.slice(0, Spower * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("power") &&
											POWER[key].name === selectedProducts.power.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts["power"] = {
												...POWER[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(7);
											setProgress(progress);
											setStep(8);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${POWER[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>

										<p>{POWER[key].name}</p>
										<p>₹{POWER[key].price}</p>
									</div>
								))}
						</div>
						<div className="textAlignCenter">
							<button
								className="  loadmore "
								onClick={() => setSpower(Spower + 1)}
							>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}
				{step === 8 ? (
					<div className="section_container">
						{/* <h1 className="textAlignCenter">SELECT MONITOR</h1> */}
						<Search set={setMONITOR} str="searchMONITOR" placeholder="Search Monitor ...." />

						<div className="product_display">
							{Object.keys(MONITOR)
								.slice(0, Smonitor * 10)
								.map((key, idx) => (
									<div
										className={`product_container ${
											selectedProducts.hasOwnProperty("monitor") &&
											MONITOR[key].name === selectedProducts.monitor.name
												? "darkish_blue"
												: null
										}`}
										key={idx}
										onClick={() => {
											selectedProducts["monitor"] = {
												...MONITOR[key],
											};
											setSelectedProducts(selectedProducts);
											progress.push(8);
											setProgress(progress);
											setStep(9);
										}}
									>
										<div className="image-container">
											<img
												src={`/storage/${MONITOR[key].imageurl}`}
												alt=""
												className="product_image"
											/>
										</div>
										<p>{MONITOR[key].name}</p>
										<p>₹{MONITOR[key].price}</p>
									</div>
								))}
						</div>
						<div className=" textAlignCenter">
							<button
								className="loadmore "
								onClick={() => setSmonitor(Smonitor + 1)}
							>
								Load More &darr;
							</button>
						</div>
					</div>
				) : null}
				{step === 9 ? (
					<div className="section_container">
						<h1 className="textAlignCenter">Your Selected components</h1>
						<div className="product_display">
							{console.log(selectedProducts)}
							{Object.keys(selectedProducts).map((key, idx) => (
								<div className="product_container" key={idx}>
									<div className="image-container">
										<img
											src={`/storage/${selectedProducts[key].imageurl}`}
											alt=""
											className="product_image"
										/>
									</div>
									<p>{key}</p>
									<p>{selectedProducts[key].name}</p>
									<p>₹{selectedProducts[key].price}</p>
								</div>
							))}
						</div>
						<div style={{ margin: "0.5rem" }} className="checkout">
							<div
								className={`disable__overlay ${
									cookies.login_Data.login !== true ? "disabled" : null
								}`}
								style={
									cookies.login_Data.login !== true
										? { zIndex: 10 }
										: { zIndex: -1 }
								}
							></div>
							{cookies.login_Data.login !== true && (
								<p>Please Login in to continue</p>
							)}
							<p>
								Total Amount:
								{amount} &#8377;
							</p>
							{/* <button className="checkout">Checkout</button> */}
							<Checkout TotalAmount={amount} />
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}
