using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ONLINETEST_ENTITY.Models
{
    public partial class OnlineTestContext : DbContext
    {
        public virtual DbSet<Article> Article { get; set; }
        public virtual DbSet<Attachment> Attachment { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Jpaper> Jpaper { get; set; }
        public virtual DbSet<Options> Options { get; set; }
        public virtual DbSet<Paper> Paper { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Result> Result { get; set; }
        public virtual DbSet<Subject> Subject { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning
                //To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //optionsBuilder.UseSqlServer(@"Server=DESKTOP-NQS2LUN\SQLEXPRESS;Database=OnlineTest;Trusted_Connection=True;User ID=sa;Password=jxzxc1230;");
                optionsBuilder.UseSqlServer(@"Data Source=.\SQLEXPRESS;Initial Catalog=OnlineTest;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>(entity =>
            {
                entity.Property(e => e.Id).IsRequired();

                entity.Property(e => e.Author)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.Property(e => e.Label).HasMaxLength(50);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Article)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_ARTICLE_REFERENCE_USER");
            });

            modelBuilder.Entity<Attachment>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Avatar).IsRequired();

                entity.Property(e => e.AvatarType).HasColumnName("Avatar_type");

                entity.Property(e => e.OwnerId).HasColumnName("Owner_id");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.Id).IsRequired();

                entity.Property(e => e.Content).IsRequired();

                entity.Property(e => e.CreateTime).HasColumnType("datetime");

                entity.HasOne(d => d.Article)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.ArticleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMMENT_REFERENCE_ARTICLE");

                entity.HasOne(d => d.Owner)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.OwnerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMMENT_REFERENCE_USER");
            });

            modelBuilder.Entity<Jpaper>(entity =>
            {
                entity.ToTable("JPaper");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.PapId).HasColumnName("Pap_Id");

                entity.Property(e => e.QueId).HasColumnName("Que_Id");

                entity.HasOne(d => d.Pap)
                    .WithMany(p => p.Jpaper)
                    .HasForeignKey(d => d.PapId)
                    .HasConstraintName("FK_具体试卷表_REFERENCE_PAPER");

                entity.HasOne(d => d.Que)
                    .WithMany(p => p.Jpaper)
                    .HasForeignKey(d => d.QueId)
                    .HasConstraintName("FK_具体试卷表_REFERENCE_QUESTION");
            });

            modelBuilder.Entity<Options>(entity =>
            {
                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.QueId).HasColumnName("Que_ID");

                entity.HasOne(d => d.Que)
                    .WithMany(p => p.Options)
                    .HasForeignKey(d => d.QueId)
                    .HasConstraintName("FK_OPTIONS_REFERENCE_QUESTION");
            });

            modelBuilder.Entity<Paper>(entity =>
            {
                entity.Property(e => e.CreateTime)
                    .HasColumnName("Create_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.PaperDeatail).HasMaxLength(50);

                entity.Property(e => e.PaperName)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.SubId).HasColumnName("Sub_ID");

                entity.HasOne(d => d.Sub)
                    .WithMany(p => p.Paper)
                    .HasForeignKey(d => d.SubId)
                    .HasConstraintName("FK_PAPER_REFERENCE_SUBJECT");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Paper)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_PAPER_REFERENCE_USER");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .IsRequired();

                entity.Property(e => e.QuestionAnlysis).HasColumnName("Question_anlysis");

                entity.Property(e => e.QuestionClass).HasColumnName("Question_class");

                entity.Property(e => e.QuestionContent)
                    .IsRequired()
                    .HasColumnName("Question_content");
                entity.Property(e => e.IsDelete)
                .IsRequired();

                entity.Property(e => e.QuestionType).HasColumnName("Question_type");

                entity.Property(e => e.RightAnswer).IsRequired();

                entity.Property(e => e.SubjectId).HasColumnName("Subject_id");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUESTION_REFERENCE_SUBJECT");
            });

            modelBuilder.Entity<Result>(entity =>
            {
                entity.Property(e => e.Id).IsRequired();

                entity.Property(e => e.PaperId).HasColumnName("Paper_ID");

                entity.Property(e => e.QueId).HasColumnName("Que_ID");

                entity.Property(e => e.UserId).HasColumnName("User_ID");

                entity.HasOne(d => d.ContentNavigation)
                    .WithMany(p => p.Result)
                    .HasForeignKey(d => d.Content)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RESULT_REFERENCE_OPTIONS");

                entity.HasOne(d => d.Paper)
                    .WithMany(p => p.Result)
                    .HasForeignKey(d => d.PaperId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RESULT_REFERENCE_PAPER");

                entity.HasOne(d => d.Que)
                    .WithMany(p => p.Result)
                    .HasForeignKey(d => d.QueId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RESULT_REFERENCE_QUESTION");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Result)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RESULT_REFERENCE_USER");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.QuestionCount).HasColumnName("Question_count");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Account)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.NikeName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.IsVerification)
                .IsRequired();
                entity.Property(e => e.VerificationCode)
                .IsRequired();
                entity.Property(e => e.CreateTime)
                .IsRequired();

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(10);
            });
        }
    }
}
