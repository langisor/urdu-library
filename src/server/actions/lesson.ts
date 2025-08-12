"use server";
import { prismaClient } from "@/lib/prisma";
export async function actionGetLessonQuizzes(lid: string) {
	const id = Number(lid);
	const quizzes = await prismaClient.quiz.findMany({
		where: {
			lessonID: id,
		},
	});
	return quizzes;
}
