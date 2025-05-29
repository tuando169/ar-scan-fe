import { useState } from "react";
import LoginPopup from "../../auth/LoginPopup";
import RegisterPopup from "../../auth/RegisterPopup";
import CreateModelPopup from "./popups/CreateModelPopup";
import axios from "axios";
import { apiEndpoints } from "../../../apiEndpoints";
import type { Model } from "../../../types";
import ArSpaceContainer from "../../ar/ArSpaceContainer";

export default function Manage() {
  async function fetchData() {
    try {
      const res = await axios.get(apiEndpoints.model.getList, {
        params: {
          user: localStorage.getItem("user") || "",
        },
      });
      setModelList(res.data.models);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [isLogged] = useState(localStorage.getItem("user"));
  const [isShownAction, setIsShownAction] = useState(false);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);
  const [isShowRegisterPopup, setIsShowRegisterPopup] = useState(false);
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const [modelList, setModelList] = useState([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      {isShowLoginPopup && (
        <LoginPopup onClose={() => setIsShowLoginPopup(false)} />
      )}
      {isShowRegisterPopup && (
        <RegisterPopup onClose={() => setIsShowRegisterPopup(false)} />
      )}
      {isShowCreatePopup && (
        <CreateModelPopup
          onClose={() => setIsShowCreatePopup(false)}
          onCreated={() => fetchData()}
        />
      )}
      {isLogged ? (
        <div className=" mt-20">
          <div
            className="absolute top-4 right-4 text-3xl text-gray-700 cursor-pointer"
            onClick={() => setIsShownAction(!isShownAction)}
          >
            ...
          </div>
          {isShownAction && (
            <div
              className="absolute top-16 right-6 bg-white text-black rounded-lg shadow-xl z-10 w-48"
              onClick={() => setIsShownAction(false)}
            >
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsShowCreatePopup(true)}
              >
                Create
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Details
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Change model
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Delete
              </div>
            </div>
          )}
          <div>
            {selectedModel && <ArSpaceContainer model={selectedModel.file} />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {modelList.map((model: Model) => (
              <div
                key={model.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedModel(model)}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {model.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {model.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">ID: {model.id}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 space-y-4">
          <button className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg text-lg shadow hover:bg-blue-700">
            Login
          </button>
          <button className="w-full max-w-xs bg-green-600 text-white py-3 rounded-lg text-lg shadow hover:bg-green-700">
            Register
          </button>
        </div>
      )}
    </div>
  );
}
