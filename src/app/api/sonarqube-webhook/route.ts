import { NextResponse } from 'next/server';
import axios from 'axios';
import { SonarQubeWebhookBody } from '@/types/api/sonarqube';

export async function POST(request: Request) {
  try {
    const body: SonarQubeWebhookBody = await request.json();
    console.log('Received SonarQube webhook:', body);

    // Формирование данных для создания GitHub issue
    const githubIssue = {
      title: body.issue?.message ?? 'Новая проблема от SonarQube',
      body: `Детали проблемы:\n\n${JSON.stringify(body, null, 2)}`,
    };

    const githubRepo = process.env.GITHUB_REPO;
    const githubToken = process.env.GITHUB_TOKEN; // Убедитесь, что переменная окружения настроена

    const response = await axios.post(
      `https://api.github.com/repos/${githubRepo}/issues`,
      githubIssue,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error(
      'Ошибка при создании GitHub issue:',
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      { error: 'Ошибка при создании GitHub issue' },
      { status: 500 }
    );
  }
}
