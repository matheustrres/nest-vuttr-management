import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { SessionSerializer } from './auth/session.serializer';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { ToolController } from './presenters/controllers/tool.controller';
import { UserController } from './presenters/controllers/user.controller';

// tool use-cases
import { CreateToolUseCase } from '@app/use-cases/tool/create-tool';
import { DeleteToolUseCase } from '@app/use-cases/tool/delete-tool';
import { FindToolByIdUseCase } from '@app/use-cases/tool/find-tool-by-id';
import { ListToolsUseCase } from '@app/use-cases/tool/list-tools';
// user use-cases
import { CreateUserUseCase } from '@app/use-cases/user/create-user';
import { LoginUserUseCase } from '@app/use-cases/user/login-user';

import {
	DeleteCacheKey,
	GetCacheKey,
	SetCacheKey,
} from '@data/contracts/cache';
import { HashString, CompareStrings } from '@data/contracts/hash';
// tool repositories
import {
	CreateToolRepository,
	DeleteToolRepository,
	FindToolByIdRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
	ListToolsRepository as ListToolsRepository,
} from '@data/contracts/repositories/tool';

// user repositories
import {
	CreateUserRepository,
	FindUserByEmailRepository,
} from '@data/contracts/repositories/user';

import { VUTTRCacheModule } from '@infra/cache/cache.module';
import { DatabaseModule } from '@infra/database/database.module';
import { HashModule } from '@infra/providers/hash/hash.module';

// tool cache contracts
type CreateToolUseCaseCacheManager = SetCacheKey;
type DeleteToolUseCaseCacheManager = GetCacheKey & DeleteCacheKey;
type FindToolByIdUseCaseCacheManager = GetCacheKey & SetCacheKey;

// tool repositories contracts
type CreateToolUseCaseRepository = CreateToolRepository &
	FindToolByLinkRepository &
	FindToolByTitleRepository;
type DeleteToolUseCaseRepository = DeleteToolRepository &
	FindToolByIdRepository;
type FindToolByIdUseCaseRepository = FindToolByIdRepository;
type ListToolsUseCaseRepository = ListToolsRepository;

// user repositories contracts
type CreateUserUseCaseRepository = CreateUserRepository &
	FindUserByEmailRepository;
type LoginUserUseCaseRepository = FindUserByEmailRepository;

@Module({
	imports: [
		DatabaseModule,
		VUTTRCacheModule,
		HashModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
			session: true,
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY as string,
			signOptions: {
				algorithm: 'HS384',
				expiresIn: '12h',
			},
			verifyOptions: {
				algorithms: ['HS384'],
				ignoreExpiration: false,
			},
		}),
	],
	providers: [
		// tool-related
		{
			provide: CreateToolUseCase,
			useFactory: (
				cacheManager: CreateToolUseCaseCacheManager,
				toolRepository: CreateToolUseCaseRepository,
			): CreateToolUseCase =>
				new CreateToolUseCase(cacheManager, toolRepository),
			inject: [
				SetCacheKey,
				CreateToolRepository,
				FindToolByLinkRepository,
				FindToolByTitleRepository,
			],
		},
		{
			provide: DeleteToolUseCase,
			useFactory: (
				cacheManager: DeleteToolUseCaseCacheManager,
				toolRepository: DeleteToolUseCaseRepository,
			): DeleteToolUseCase =>
				new DeleteToolUseCase(cacheManager, toolRepository),
			inject: [DeleteCacheKey, DeleteToolRepository, FindToolByIdRepository],
		},
		{
			provide: FindToolByIdUseCase,
			useFactory: (
				cacheManager: FindToolByIdUseCaseCacheManager,
				toolRepository: FindToolByIdUseCaseRepository,
			): FindToolByIdUseCase =>
				new FindToolByIdUseCase(cacheManager, toolRepository),
			inject: [GetCacheKey, FindToolByIdRepository],
		},
		{
			provide: ListToolsUseCase,
			useFactory: (
				toolRepository: ListToolsUseCaseRepository,
			): ListToolsUseCase => new ListToolsUseCase(toolRepository),
			inject: [ListToolsRepository],
		},
		// user-related
		{
			provide: CreateUserUseCase,
			useFactory: (
				hasher: HashString,
				userRepository: CreateUserUseCaseRepository,
			): CreateUserUseCase => new CreateUserUseCase(hasher, userRepository),
			inject: [HashString, CreateUserRepository],
		},
		{
			provide: LoginUserUseCase,
			useFactory: (
				hasher: CompareStrings,
				userRepository: LoginUserUseCaseRepository,
			): LoginUserUseCase => new LoginUserUseCase(hasher, userRepository),
			inject: [CompareStrings, FindUserByEmailRepository],
		},
		LocalStrategy,
		SessionSerializer,
	],
	controllers: [ToolController, UserController],
})
export class HTTPModule {}
