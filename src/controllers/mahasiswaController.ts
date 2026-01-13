import type { Request, Response } from "express";
import { MahasiswaModel } from "@/models/mahasiswaModel";
import { HttpException } from "@/utils/httpException";
import { successResponse } from "@/utils/apiResponse";

export class MahasiswaController {
  /**
   * GET /mahasiswa - Get all mahasiswa
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    const mahasiswa = await MahasiswaModel.getAll();
    successResponse(res, mahasiswa, "Data mahasiswa berhasil diambil");
  }

  /**
   * GET /mahasiswa/:id - Get mahasiswa by ID
   */
  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const mahasiswa = await MahasiswaModel.getById(id);

    if (!mahasiswa) {
      throw new HttpException(404, "Mahasiswa tidak ditemukan");
    }

    successResponse(res, mahasiswa, "Data mahasiswa berhasil diambil");
  }

  /**
   * POST /mahasiswa - Create new mahasiswa
   */
  static async create(req: Request, res: Response): Promise<void> {
    const { nim, nama, jurusan, email } = req.body;

    // Validasi required fields
    if (!nim || !nama || !jurusan) {
      throw new HttpException(400, "NIM, nama, dan jurusan wajib diisi");
    }

    // Cek duplikat NIM
    const existingNim = await MahasiswaModel.getByNim(nim);
    if (existingNim) {
      throw new HttpException(400, "NIM sudah digunakan");
    }

    // Cek duplikat email jika ada
    if (email) {
      const existingEmail = await MahasiswaModel.getAll();
      const emailExists = existingEmail.find(m => m.email === email);
      if (emailExists) {
        throw new HttpException(400, "Email sudah digunakan");
      }
    }

    const mahasiswa = await MahasiswaModel.create({ nim, nama, jurusan, email });
    successResponse(res, mahasiswa, "Mahasiswa berhasil ditambahkan", 201);
  }

  /**
   * PUT /mahasiswa/:id - Update mahasiswa
   */
  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nim, nama, jurusan, email } = req.body;

    // Cek apakah mahasiswa exists
    const existing = await MahasiswaModel.getById(id);
    if (!existing) {
      throw new HttpException(404, "Mahasiswa tidak ditemukan");
    }

    // Cek duplikat NIM jika diubah
    if (nim && nim !== existing.nim) {
      const existingNim = await MahasiswaModel.getByNim(nim);
      if (existingNim) {
        throw new HttpException(400, "NIM sudah digunakan");
      }
    }

    const mahasiswa = await MahasiswaModel.update(id, { nim, nama, jurusan, email });
    successResponse(res, mahasiswa, "Mahasiswa berhasil diupdate");
  }

  /**
   * DELETE /mahasiswa/:id - Delete mahasiswa
   */
  static async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    // Cek apakah mahasiswa exists
    const existing = await MahasiswaModel.getById(id);
    if (!existing) {
      throw new HttpException(404, "Mahasiswa tidak ditemukan");
    }

    await MahasiswaModel.delete(id);
    successResponse(res, null, "Mahasiswa berhasil dihapus");
  }
}
