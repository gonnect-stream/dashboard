import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import axios from "axios";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const estados = [
  { nome: "Acre", sigla: "AC" },
  { nome: "Alagoas", sigla: "AL" },
  { nome: "Amapá", sigla: "AP" },
  { nome: "Amazonas", sigla: "AM" },
  { nome: "Bahia", sigla: "BA" },
  { nome: "Ceará", sigla: "CE" },
  { nome: "Distrito Federal", sigla: "DF" },
  { nome: "Espírito Santo", sigla: "ES" },
  { nome: "Goiás", sigla: "GO" },
  { nome: "Maranhão", sigla: "MA" },
  { nome: "Mato Grosso", sigla: "MT" },
  { nome: "Mato Grosso do Sul", sigla: "MS" },
  { nome: "Minas Gerais", sigla: "MG" },
  { nome: "Pará", sigla: "PA" },
  { nome: "Paraíba", sigla: "PB" },
  { nome: "Paraná", sigla: "PR" },
  { nome: "Pernambuco", sigla: "PE" },
  { nome: "Piauí", sigla: "PI" },
  { nome: "Rio de Janeiro", sigla: "RJ" },
  { nome: "Rio Grande do Norte", sigla: "RN" },
  { nome: "Rio Grande do Sul", sigla: "RS" },
  { nome: "Rondônia", sigla: "RO" },
  { nome: "Roraima", sigla: "RR" },
  { nome: "Santa Catarina", sigla: "SC" },
  { nome: "São Paulo", sigla: "SP" },
  { nome: "Sergipe", sigla: "SE" },
  { nome: "Tocantins", sigla: "TO" },
];

export default function CreateEventModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: "",
    cidade: "",
    estado: "",
    data: "",
    hora: "",
    status: "Programado",
    descricao: "",
    imagem: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, imagem: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    if (!formData.imagem) {
      setLoading(false);
      setMessage(`Erro: É obrigatório o uso da imagem`);
      return;
    }

    try {
      if (!formData.imagem) throw new Error("Imagem obrigatória.");
      const nomeEventoSlug = formData.nome;
      const timestamp = Date.now();
      const nomeFinal = `/thumbs/${nomeEventoSlug}-timestamp:${timestamp}`;

      const renamedFile = new File([formData.imagem], nomeFinal, {
        type: formData.imagem.type,
      });

      const form = new FormData();
      form.append("file", renamedFile);
      form.append("customName", nomeFinal);

      const uploadRes = await axios.post(
        "https://backend-production-5486.up.railway.app/api/upload",
        form,
        {
          withCredentials: true, // se usar cookies no backend
          headers: {
            "Content-Type": "multipart/form-data", // opcional, axios define automaticamente
          },
        }
      );

      const thumbUrl = uploadRes.data?.thumbUrl;
      if (!thumbUrl) throw new Error("URL da imagem não retornada.");

      const { error } = await supabase.from("eventos").insert({
        nome: formData.nome,
        cidade: formData.cidade,
        estado: formData.estado,
        data: formData.data,
        hora: formData.hora,
        status: formData.status,
        descricao: formData.descricao,
        thumbUrl,
      });

      if (error) throw new Error(error.message);

      setMessage("✅ Evento criado com sucesso!");
      setFormData({
        nome: "",
        cidade: "",
        estado: "",
        data: "",
        status: "Programado",
        hora: "",
        descricao: "",
        imagem: null,
      });
      setPreview(null);
      onSuccess();
      onClose();
    } catch (err) {
      const backendError =
        err.response?.data?.details || err.response?.data?.error || err.message;

      console.error("❌ Erro no processo:", err);
      const msg =
        typeof backendError === "object"
          ? JSON.stringify(backendError)
          : backendError;

      setMessage(`Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 ">
        <Dialog.Panel className="w-full max-w-lg rounded bg-zinc-900 p-6 space-y-4 shadow max-h-[calc(100vh-60px)] overflow-y-auto">
          <Dialog.Title className="text-md font-bold text-white sm:truncate sm:text-2xl sm:tracking-tight">
            Criar Evento
          </Dialog.Title>

          <form>
            <div className="space-y-12">
              <div className="border-b border-zinc-100/10 pb-6">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="thumbUrl"
                      className="block text-sm/6 font-medium text-zinc-100"
                    >
                      Imagem da transmissão
                    </label>

                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-zinc-100/25 p-5">
                      <div className="text-center w-full">
                        {preview ? (
                          <img
                            src={preview}
                            alt="preview"
                            className="w-full aspect-[16/9] rounded-lg"
                          />
                        ) : (
                          <>
                            <PhotoIcon
                              aria-hidden="true"
                              className="mx-auto size-12 text-gray-300"
                            />
                            <p className="text-xs/5 text-gray-600 mt-1">
                              PNG, JPG, GIF com tamanho máximo de to 10MB
                            </p>
                            <p className="text-xs/5 text-gray-600 mt-1">
                              Tamanho indicado de 1920x1080
                            </p>
                          </>
                        )}

                        <input
                          name="imagem"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="text-white bg-zinc-600 rounded-md pr-2 mt-4 mb-5"
                        />

                        {message && (
                          <div
                            className={`text-sm ${
                              message.includes("sucesso")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {message}
                          </div>
                        )}

                        <div className="mt-4 flex text-sm/6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600  hover:text-red-400 px-2 m-auto"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="nomeEvento"
                      className="block text-sm/6 font-medium text-zinc-100"
                    >
                      Nome do evento
                    </label>

                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      autoComplete="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full mt-2 text-sm bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-2  rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="cidade"
                      className="block text-sm/6 font-medium text-zinc-100"
                    >
                      Cidade
                    </label>
                    <div className="mt-2">
                      <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        autoComplete="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        className="w-full mt-2 text-sm bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-2  rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="estado"
                      className="block text-sm/6 font-medium text-zinc-100"
                    >
                      Estado
                    </label>

                    <div className="sm:col-span-3">
                      <div className="mt-4 grid grid-cols-1">
                        <select
                          id="estado"
                          value={formData.estado}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              estado: e.target.value,
                            }))
                          }
                          className="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-1.5 outline-1 -outline-offset-1 outline-zinc-400 "
                        >
                          <option value="">Selecione um estado</option>
                          {estados.map((estado) => (
                            <option key={estado.sigla} value={estado.sigla}>
                              {estado.nome}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="dia-evento"
                      className="block text-sm/6 font-medium text-zinc-100"
                    >
                      Dia da transmissão
                    </label>
                    <div className="flex gap-2">
                      <input
                        name="data"
                        type="date"
                        value={formData.data}
                        onChange={handleChange}
                        className="col-start-1 mt-2 row-start-1 w-full appearance-none rounded-lg bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-1.5 outline-1 -outline-offset-1 outline-zinc-400 "
                      />
                      <input
                        name="hora"
                        type="time"
                        value={formData.hora}
                        onChange={handleChange}
                        className="col-start-1 mt-2 row-start-1 w-full appearance-none rounded-lg bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-1.5 outline-1 -outline-offset-1 outline-zinc-400 "
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="descricao"
                    className="block text-sm/6 font-medium text-zinc-100 mt-5"
                  >
                    Breve descrição do evento
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="descricao"
                      name="descricao"
                      rows={6}
                      className="w-full text-sm bg-zinc-800 border border-zinc-500 border-0.5 text-zinc-400 px-5 py-2  rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                      value={formData.descricao}
                      onChange={handleChange}
                    />
                  </div>
                  <p className=" text-sm/6 text-zinc-100/20">
                    Faça uma breve descrição do evento
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={onClose}
                className="text-sm/6 font-semibold text-zinc-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {loading ? "Salvando..." : "Criar Evento"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
