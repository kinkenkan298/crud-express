import type { Request, Response } from "express";
import { MahasiswaModel } from "@/models/mahasiswaModel";
import { HttpException } from "@/utils/httpException";
import { successResponse } from "@/utils/apiResponse";

export class MahasiswaController {

  static async getAll(req: Request, res: Response): Promise<void> {
    const mahasiswa = await MahasiswaModel.getAll();
    successResponse(res, mahasiswa, "Data mahasiswa berhasil diambil");
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new HttpException(400, "ID harus berupa string");
    }

    const mahasiswa = await MahasiswaModel.getById(id);

    if (!mahasiswa) {
      throw new HttpException(404, "Mahasiswa tidak ditemukan");
    }

    successResponse(res, mahasiswa, "Data mahasiswa berhasil diambil");
  }


  static async create(req: Request, res: Response): Promise<void> {
    const { nim, nama, jurusan, email } = req.body;

    if (!nim || !nama || !jurusan) {
      throw new HttpException(400, "NIM, nama, dan jurusan wajib diisi");
    }

    const existingNim = await MahasiswaModel.getByNim(nim);
    if (existingNim) {
      throw new HttpException(400, "NIM sudah digunakan");
    }

    if (email) {
      const existingEmail = await MahasiswaModel.getByEmail(email);
      if (existingEmail) {
        throw new HttpException(400, "Email sudah digunakan");
      }
    }

    const mahasiswa = await MahasiswaModel.create({ nim, nama, jurusan, email });
    successResponse(res, mahasiswa, "Mahasiswa berhasil ditambahkan", 201);
  }


  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nim, nama, jurusan, email } = req.body;

    if (typeof id !== "string") {
      throw new HttpException(400, "ID harus berupa string");
    }

    const existing = await MahasiswaModel.getById(id);
    if (!existing) {
      throw new HttpException(404, "Mahasiswa tidak ditemukan");
    }

    if (nim && nim !== existing.nim) {
      const existingNim = await MahasiswaModel.getByNim(nim);
      if (existingNim) {
        throw new HttpException(400, "NIM sudah digunakan");
      }
    }

    if (email && email !== existing.email) {
      const existingEmail = await MahasiswaModel.getByEmail(email);
      if (existingEmail) {
        throw new HttpException(400, "Email sudah digunakan");
      }
    }

    const mahasiswa = await MahasiswaModel.update(id, { nim, nama, jurusan, email });
    successResponse(res, mahasiswa, "Mahasiswa berhasil diupdate");
  }


  static async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new HttpException(400, "ID harus berupa string");
    }

    const nim = await MahasiswaModel.getById(id);
    if (!nim) {
      throw new HttpException(404, "Mahasiswa tidak ditemukan");
    }

    await MahasiswaModel.delete(id);
    successResponse(res, null, "Mahasiswa berhasil dihapus");
  }
}
