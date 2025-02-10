export interface SonarQubeWebhookBody {
  issue?: {
    message?: string;
    status?: string;
    resolution?: string;
  };
}

export interface GitHubIssue {
  title: string;
  body?: string;
  number?: number;
}
