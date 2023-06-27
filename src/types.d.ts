import Discord from 'discord.js';
import Client from './structures/Client';

export interface CommandEvent {
  name: String;

  /**
   * La funcion principal del evento
   */
  run(
    interaction: Discord.Interaction & { client: Client },
  ): void | Promise<void>;
}

export interface SlashCommand {
  /**
   * Lista de ids de roles requeridos para utilizar el comando
   */
  roles_req?: String[];

  /**
   * Lista de permisos requeridos para utilizar el comando
   */
  perms_req?: Discord.PermissionResolvable[];

  /**
   * Si es requerido que el usuario tenga todos los roles para utilizar el comando
   */
  allRoles_req?: Boolean;

  /**
   * Si es requerido que el usuario tenga todos los permisos para utilizar el comando
   */
  allPerms_req?: Boolean;

  /**
   * Si es requerido que el usuario tenga los roles y los permisos requeridos para utilizar el comando
   */
  everthing_req?: Boolean;

  /**
   * Convierte el comando unicamente disponible para los owners declarados en el .env
   */
  onlyOwners?: boolean;

  /**
   * Los datos del comando a cargar a discord
   */
  data: Discord.SlashCommandBuilder;

  /**
   * La funcion principal del comando
   */
  run(
    interaction: Discord.CommandInteraction & { client: Client },
  ): void | Promise<void>;
}

export type SlashCommandsCollection = Discord.Collection<String, SlashCommand>;
