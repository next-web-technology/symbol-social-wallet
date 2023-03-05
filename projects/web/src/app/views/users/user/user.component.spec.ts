import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult, screen } from '@testing-library/angular';
import { createRandomUser } from '../../../services/user/user.mock';
import { ViewUserComponent } from './user.component';

const GOOGLE_USER_NORMAL = createRandomUser('google');
const TWITTER_USER_NORMAL = createRandomUser('twitter');
const GITHUB_USER_NORMAL = createRandomUser('github');
const renderPattern = [
  { case: 'userId = null', id: null, user: null },
  { case: 'userId = undefined', id: undefined, user: undefined },
  { case: 'userId = ""', id: '', user: undefined },
  { case: 'google user', id: GOOGLE_USER_NORMAL.id, user: GOOGLE_USER_NORMAL },
  { case: 'twitter user', id: TWITTER_USER_NORMAL.id, user: TWITTER_USER_NORMAL },
  { case: 'github user', id: GITHUB_USER_NORMAL.id, user: GITHUB_USER_NORMAL },
];

describe('UserComponent', () => {
  let renderResult: RenderResult<ViewUserComponent, ViewUserComponent>;
  let fixture: ComponentFixture<ViewUserComponent>;
  let component: ViewUserComponent;

  beforeEach(async () => {
    renderResult = await render(ViewUserComponent);
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading... with "null"', () => {
    component.user = null;
    fixture.autoDetectChanges();
    expect(screen.getByText('loading...')).toBeTruthy();
  });

  it('should render not found with "undefined"', () => {
    component.user = undefined;
    fixture.autoDetectChanges();
    expect(screen.getByText('not found')).toBeTruthy();
  });

  it('should render google User info with google User', () => {
    const user = renderPattern[3].user;
    component.user = user;
    fixture.autoDetectChanges();
    expect(screen.getByText('User')).toBeTruthy();
    expect(screen.getByText(`id: ${user?.id}`)).toBeTruthy();
    expect(screen.getByText(`name: ${user?.name}`)).toBeTruthy();
    expect(screen.getByText(`photoUrl: ${user?.photoUrl}`)).toBeTruthy();
    expect(screen.getByText(`bio: ${user?.bio}`)).toBeTruthy();
    expect(screen.getByText(`provider: ${user?.provider}`)).toBeTruthy();
    expect(screen.getByText(`google: ${user?.google}`)).toBeTruthy();
  });

  it('should render twitter User info with twitter User', () => {
    const user = renderPattern[4].user;
    component.user = user;
    fixture.autoDetectChanges();
    expect(screen.getByText('User')).toBeTruthy();
    expect(screen.getByText(`id: ${user?.id}`)).toBeTruthy();
    expect(screen.getByText(`name: ${user?.name}`)).toBeTruthy();
    expect(screen.getByText(`photoUrl: ${user?.photoUrl}`)).toBeTruthy();
    expect(screen.getByText(`bio: ${user?.bio}`)).toBeTruthy();
    expect(screen.getByText(`provider: ${user?.provider}`)).toBeTruthy();
    expect(screen.getByText(`twitter: ${user?.twitter}`)).toBeTruthy();
  });

  it('should render github User info with github User', () => {
    const user = renderPattern[5].user;
    component.user = user;
    fixture.autoDetectChanges();
    expect(screen.getByText('User')).toBeTruthy();
    expect(screen.getByText(`id: ${user?.id}`)).toBeTruthy();
    expect(screen.getByText(`name: ${user?.name}`)).toBeTruthy();
    expect(screen.getByText(`photoUrl: ${user?.photoUrl}`)).toBeTruthy();
    expect(screen.getByText(`bio: ${user?.bio}`)).toBeTruthy();
    expect(screen.getByText(`provider: ${user?.provider}`)).toBeTruthy();
    expect(screen.getByText(`github: ${user?.github}`)).toBeTruthy();
  });
});
