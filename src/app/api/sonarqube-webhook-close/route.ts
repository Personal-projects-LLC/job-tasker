import { NextResponse } from 'next/server';
import axios from 'axios';

interface GitHubIssue {
  title: string;
  number: number;
}

interface SonarQubeWebhookBody {
  issue?: {
    status?: string;
    resolution?: string;
    message?: string;
  };
}

export async function POST(request: Request) {
  try {
    const body: SonarQubeWebhookBody = await request.json();
    console.log('Received SonarQube webhook for closing:', body);

    if (body.issue?.status === 'CLOSED' || body.issue?.resolution === 'FIXED') {
      // Находим соответствующий GitHub issue по тексту
      const githubRepo = 'Personal-projects-LLC/job-tasker';
      const githubToken = process.env.GITHUB_TOKEN;

      // Получаем список открытых issues из GitHub
      const response = await axios.get<GitHubIssue[]>(
        `https://api.github.com/repos/${githubRepo}/issues?state=open`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      // Ищем issue с соответствующим сообщением
      const issueToClose = response.data.find(
        (issue) => issue.title === body.issue?.message
      );

      if (issueToClose) {
        // Закрываем найденный issue
        await axios.patch(
          `https://api.github.com/repos/${githubRepo}/issues/${issueToClose.number}`,
          {
            state: 'closed',
            state_reason: 'completed',
          },
          {
            headers: {
              Authorization: `token ${githubToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        return NextResponse.json(
          { message: `Issue #${issueToClose.number} closed successfully` },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: 'No matching GitHub issue found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Issue is not closed in SonarQube' },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'Ошибка при закрытии GitHub issue:',
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      { error: 'Ошибка при закрытии GitHub issue' },
      { status: 500 }
    );
  }
}
