import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametroPipe } from './pipes/jogadores-validacao-parametros-pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    const { email } = criarJogadorDto;
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }
  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultarJogadorPeloEmail(email);
    } else {
      return await this.jogadoresService.consultarTodosJogadores();
    }
  }
  @Delete()
  async deletarJogador(
    @Query('email', JogadoresValidacaoParametroPipe) email: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
