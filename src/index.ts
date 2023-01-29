#!/usr/bin/env node

import * as fs from "fs";
import fetch from "node-fetch";
import minimist from "minimist";
import drawPreview from "./methods/drawPreview";
import { cwd, argv } from "process";
import { join, isAbsolute } from "path";
import { LanguagesObject } from "./methods/drawLanguages";

declare module GitHubApi {
  export interface Owner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }

  export interface License {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  }

  export interface Root {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url?: any;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: License;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    temp_clone_token?: any;
    network_count: number;
    subscribers_count: number;
  }
}

/**
 * Отрисовывает превью репозитория
 * @param username имя пользователя
 * @param reponame название репозитория
 * @returns буфер с изображением (png image)
 */
export default async function draw(username: string, reponame: string) {
  // Получаем данные о репозитории
  const data = (await fetch(
    `https://api.github.com/repos/${username}/${reponame}`
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Ошибка ${res.status} при получении данных`);
      return res.json();
    })
    .catch(() => {
      throw new Error("Cannot fetch data from GitHub API");
    })) as GitHubApi.Root;
  const contributors = (await fetch(data.contributors_url).then((res) =>
    res.json()
  )) as GitHubApi.Owner[];
  const languages = (await fetch(data.languages_url).then((res) =>
    res.json()
  )) as LanguagesObject;

  // Отрисовываем превью
  return await drawPreview(
    data.owner.avatar_url,
    data.owner.login,
    data.name,
    languages,
    data.description,
    {
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      contributors: contributors.length,
    }
  );
}

if (require.main === module)
  (async () => {
    let {
      h: hello,
      u: username,
      r: reponame,
      f: folder = ".",
      n: fileName,
    } = minimist(argv.slice(2));

    if (hello) {
      console.log("Hmm, everything seems to be installed.");
      process.exit();
    }

    const buffer = await draw(username, reponame).catch((err) => {
      console.error(err);
      process.exit(1);
    });

    if (isAbsolute(folder)) folder = join(cwd(), folder);
    if (!fileName) fileName = `Preview fro ${reponame} (${username})`;
    if (!fileName.endsWith(".png")) fileName += ".png";
    fs.writeFileSync(join(folder, fileName), buffer);
    console.log("Done!");
  })();
