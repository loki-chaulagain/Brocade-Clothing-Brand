import React from "react";

export default function NewsLetter() {
  const handleSubscribe = () => {
    console.log("gdgdgd")

  };
  return (
    <div className="container my-5">
      <p className="h3 fw-bold text-center mb-3">Subscribe Our News Letter</p>
      <div onClick={handleSubscribe}>
        <div className=""  >
          <p className="col-form-label text-muted text-center mb-2">GET NOTIFIED ABOUT NEW PRODUCT ARRIVALS AND EARLY RELEASE INFO</p>
          <input
            type="email"
            required
            className="form-control rounded-0 mb-3"
            placeholder="example@email.com"
            name="email"
          />
        </div>

        <button
          type="submit"
          className="global_black_button flex-fill w-100">
          subscribe
        </button>
      </div>
    </div>
  );
}
