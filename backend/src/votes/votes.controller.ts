import {BadRequestException, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {VotesService} from './votes.service';
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {CurrentUser} from "../common/decorators/current-user.decorator";
import {User} from "../users/entities/user.entity";

@Controller('votes')
export class VotesController {
    constructor(private votesService: VotesService) {
    }

    @Post(':catId')
    @UseGuards(JwtAuthGuard)
    async vote(@Param('catId') catId: string,
               @CurrentUser() user: User): Promise<void> {
        const userId = user.id;
        if (await this.votesService.hasVoted(catId, userId)) {
            throw new BadRequestException('User has already voted for this cat');
        }
        await this.votesService.voteForCat(catId, userId);
    }

    @Get('my-history')
    @UseGuards(JwtAuthGuard)
    async getMyHistory(@CurrentUser() user: User) {
        return this.votesService.getUserVotes(user.id);
    }
}