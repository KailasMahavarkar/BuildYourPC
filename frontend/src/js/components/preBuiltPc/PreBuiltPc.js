import React, { useState } from "react";

export default function PreBuiltPc() {
  let prebuiltpc = [
    {
      name: "ECLIPSE PC 2",
      price: "₹114,990",
      imageUrl:
        "https://www.pcstudio.in/wp-content/uploads/2021/04/ECLIPSE-PC-2-1.png",
      url: "https://www.pcstudio.in/product/eclipse-pc-2/",
    },
    {
      name: "CREATOR PLUS PC 1",
      price: "₹119,900",
      imageUrl:
        "https://www.pcstudio.in/wp-content/uploads/2021/03/Creator-Plus-PC-1-1.jpg",
      url: "https://www.pcstudio.in/product/creator-plus-pc-1/",
    },
    {
      name: "CREATOR PLUS PC 2",
      price: "₹134,500",
      imageUrl:
        "https://www.pcstudio.in/wp-content/uploads/2021/02/Creator-Plus-PC-1.jpg",
      url: "https://www.pcstudio.in/product/creator-plus-pc-2/",
    },
    {
      name: "CREATOR PLUS PC 3",
      price: "₹137,000",
      imageUrl:
        "https://www.pcstudio.in/wp-content/uploads/2021/03/Creator-Plus-PC-3-1.jpg",
      url: "https://www.pcstudio.in/product/creator-plus-pc-3/",
    },
    {
      name: "GAMING PC",
      price: "₹93,000",
      imageUrl:
        "https://www.pcstudio.in/wp-content/uploads/2021/04/Streaming-Gaming-PC-1-1.png",
      url: "https://www.pcstudio.in/product/gaming-pc/",
    },
    {
      name: "EH Odin 3 Gaming PC",
      price: "₹209,167",
      imageUrl:
        "https://elitehubs-816f.kxcdn.com/wp-content/uploads/2021/03/NZXT_H510-Elite-8.jpg",
      url: "https://elitehubs.com/eh-odin-nvidia-rtx-3080-ryzen-5000-series/",
    },
    {
      name: "EH Thor 2 Gaming PC",
      price: "₹86,927",
      imageUrl:
        "https://elitehubs-816f.kxcdn.com/wp-content/uploads/2021/03/NZXT_H510-Elite-1.jpg",
      url: "https://elitehubs.com/eh-thor-nvidia-rtx-2060-ryzen-3000-series/",
    },
    {
      name: "EH Thor 5 Gaming PC ",
      price: "₹152,228",
      imageUrl:
        "https://elitehubs-816f.kxcdn.com/wp-content/uploads/2021/03/NZXT_H510-Elite-7-1.jpg",
      url: "https://elitehubs.com/eh-thor-nvidia-rtx-3060ti-ryzen-5000-series/",
    },
    {
      name: "EH Thor 3 Gaming PC",
      price: "₹135,823",
      imageUrl:
        "https://elitehubs-816f.kxcdn.com/wp-content/uploads/2021/03/NZXT_H510-Elite-6.jpg",
      url: "https://elitehubs.com/eh-thor-nvidia-rtx-3060-ryzen-5000-series/",
    },
    {
      name: "Pre-Built Gaming PC ",
      price: "₹59,364",
      imageUrl:
        "https://www.primeabgb.com/wp-content/uploads/2020/09/Pre-Built-Gaming-PC-4.jpg",
      url:
        "https://www.primeabgb.com/online-price-reviews-india/pre-built-gaming-pc-ryzen-5-3500-msi-b450m-pro-vdh-max-8gb-3000mhz-1tb/",
    },
    {
      name: "HADES I1050",
      price: "₹55,600",
      imageUrl:
        "https://smcinternational.in/wp-content/uploads/2020/06/130AG.png",
      url:
        "https://smcinternational.in/product/hades-i1050-i3-10100f-gtx-1650/",
    },
    {
      name: "HADES A3550",
      price: "₹62,680",
      imageUrl:
        "https://smcinternational.in/wp-content/uploads/2021/01/511MT-2.jpg",
      url:
        "https://smcinternational.in/product/hades-a3550-ryzen-5-3500-gtx-1650/",
    },
    {
      name: "HADES A3660S",
      price: "₹89,300",
      imageUrl:
        "https://smcinternational.in/wp-content/uploads/2020/10/Matrexx-55-mesh-4f-1.jpg",
      url:
        "https://smcinternational.in/product/hades-a3660s-ryzen-5-3600-gtx-1660-super/",
    },
  ];
  const [numDisp, setNumDispt] = useState(2);
  return (
    <div className="prebuiltpc" id="prebuiltpc">
      <div className="prebuiltpc__inner">
        <h1 className=" colorGold textAlignCenter padding-2">PRE-BUILT PC</h1>
        <div className="prebuiltpc__pc">
          {prebuiltpc.map((pc, key) => {
            return key < numDisp * 4 ? (
              <div className="prebuiltpc__pc--pc" key={key}>
                <a href={pc.url}>
                  <img src={pc.imageUrl} alt="" className="prebuiltpc--image" />
                </a>
                <h3>{pc.name}</h3>
                <p>{pc.price}</p>
              </div>
            ) : null;
          })}
        </div>
        <div className=" textAlignCenter">
          <button
            className="colorGold  loadmore "
            onClick={() => setNumDispt(numDisp + 1)}
          >
            Load More &darr;
          </button>
        </div>
      </div>
    </div>
  );
}
