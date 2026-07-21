import { api } from "./api";

export const IndexService = {
  // Upload 1 file Excel
  uploadSingleExcel: async (indexName, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`/index/${indexName}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  // Upload banyak file Excel sekaligus (Batch)
  uploadBatchExcel: async (indexName, files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post(`/index/${indexName}/upload-batch`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  // Ambil daftar periode histori evaluasi
  getPeriods: async (indexName) => {
    return await api.get(`/index/${indexName}/periods`);
  },

  // Ambil analisis konsistensi & saham positif
  getConsistencyAnalytics: async (indexName) => {
    return await api.get(`/index/${indexName}/analytics/simple-consistency`);
  },

  // ── Public API (consumer-facing) ──────────────────

  // Ambil daftar semua index yang tersedia
  getAllIndexes: async () => {
    return await api.get("/index/list");
  },

  // Ambil konstituen terbaru dari suatu index
  getConstituents: async (indexName) => {
    return await api.get(`/index/${indexName}/constituents`);
  },
};
