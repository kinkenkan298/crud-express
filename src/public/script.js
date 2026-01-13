function mahasiswaApp() {
  return {
    mahasiswa: [],
    searchQuery: "",
    showModal: false,
    modalMode: "add",
    editId: null,
    formData: {
      nim: "",
      nama: "",
      jurusan: "",
      email: "",
    },
    notification: {
      show: false,
      message: "",
      type: "success",
    },

    async init() {
      await this.fetchMahasiswa();
    },

    async fetchMahasiswa() {
      try {
        const req = await fetch("/api/mahasiswa");
        const res = await req.json();
        if (res.success) {
          this.mahasiswa = res.data;
        }
      } catch (error) {
        this.showToast("Gagal memuat data mahasiswa", "error");
      }
    },

    get filteredMahasiswa() {
      if (this.searchQuery === "") return this.mahasiswa;
      const query = this.searchQuery.toLowerCase();

      return this.mahasiswa.filter(
        (m) => m.nama.toLowerCase().includes(query) || m.nim.includes(query)
      );
    },

    openModal(mode, data = null) {
      this.modalMode = mode;
      if (mode === "edit" && data) {
        this.editId = data.id_mahasiswa;
        this.formData = {
          nim: data.nim,
          nama: data.nama,
          jurusan: data.jurusan,
          email: data.email || "",
        };
      } else {
        this.editId = null;
        this.resetForm();
      }
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.resetForm();
      this.editId = null;
    },

    resetForm() {
      this.formData = {
        nim: "",
        nama: "",
        jurusan: "",
        email: null,
      };
    },

    async saveMahasiswa() {
      try {
        if (this.modalMode === "add") {
          const req = await fetch("/api/mahasiswa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.formData),
          });
          const res = await req.json();

          if (res.success) {
            this.mahasiswa.push(res.data);
            this.showToast("Data mahasiswa berhasil ditambahkan!", "success");
          } else {
            this.showToast(res.message || "Gagal menambahkan data", "error");
            return;
          }
        } else {
          const req = await fetch(`/api/mahasiswa/${this.editId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.formData),
          });
          const res = await req.json();

          if (res.success) {
            const index = this.mahasiswa.findIndex(
              (m) => m.id_mahasiswa === this.editId
            );
            if (index !== -1) {
              this.mahasiswa[index] = res.data;
            }
            this.showToast("Data mahasiswa berhasil diperbarui!", "success");
          } else {
            this.showToast(res.message || "Gagal memperbarui data", "error");
            return;
          }
        }
        this.closeModal();
      } catch (error) {
        console.error(error);

        this.showToast("Terjadi kesalahan pada server", "error");
      }
    },

    async deleteMahasiswa(id) {
      if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        try {
          const req = await fetch(`/api/mahasiswa/${id}`, {
            method: "DELETE",
          });
          const res = await req.json();

          if (res.success) {
            this.mahasiswa = this.mahasiswa.filter(
              (m) => m.id_mahasiswa !== id
            );
            this.showToast("Data mahasiswa telah dihapus.", "success");
          } else {
            this.showToast(res.message || "Gagal menghapus data", "error");
          }
        } catch (error) {
          this.showToast("Terjadi kesalahan pada server", "error");
        }
      }
    },

    showToast(msg, type) {
      this.notification.message = msg;
      this.notification.type = type;
      this.notification.show = true;
      setTimeout(() => (this.notification.show = false), 3000);
    },
  };
}
