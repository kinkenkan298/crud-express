import { db } from "@/db";
import type { Mahasiswa } from "../../generated/prisma/client";

export interface CreateMahasiswaDto {
  nim: string;
  nama: string;
  jurusan: string;
  email?: string;
}

export interface UpdateMahasiswaDto {
  nim?: string;
  nama?: string;
  jurusan?: string;
  email?: string;
}

export class MahasiswaModel {
  /**
   * Get all mahasiswa
   */
  static async getAll(): Promise<Mahasiswa[]> {
    return db.mahasiswa.findMany({
      orderBy: { createAt: "desc" },
    });
  }

  /**
   * Get mahasiswa by ID
   */
  static async getById(id: string): Promise<Mahasiswa | null> {
    return db.mahasiswa.findUnique({
      where: { id_mahasiswa: id },
    });
  }

  /**
   * Get mahasiswa by NIM
   */
  static async getByNim(nim: string): Promise<Mahasiswa | null> {
    return db.mahasiswa.findUnique({
      where: { nim },
    });
  }

  /**
   * Create new mahasiswa
   */
  static async create(data: CreateMahasiswaDto): Promise<Mahasiswa> {
    return db.mahasiswa.create({
      data,
    });
  }

  /**
   * Update mahasiswa by ID
   */
  static async update(id: string, data: UpdateMahasiswaDto): Promise<Mahasiswa> {
    return db.mahasiswa.update({
      where: { id_mahasiswa: id },
      data,
    });
  }

  /**
   * Delete mahasiswa by ID
   */
  static async delete(id: string): Promise<Mahasiswa> {
    return db.mahasiswa.delete({
      where: { id_mahasiswa: id },
    });
  }
}
