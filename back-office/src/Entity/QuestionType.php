<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionType
 *
 * @ORM\Table(
 *     name="question_type",
 *     uniqueConstraints={
 *     @ORM\UniqueConstraint(name="question_type_label_key", columns={"label"}),
 *     @ORM\UniqueConstraint(name="question_type_name_key", columns={"name"})})
 * @ORM\Entity(repositoryClass="App\Repository\QuestionTypeRepository")
 */
class QuestionType extends EntityBase
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\SequenceGenerator(sequenceName="question_type_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="label", type="string", length=80, nullable=false)
     */
    private $label;

    /**
     * @var Question[]
     *
     * @ORM\ManyToMany(targetEntity="Question", mappedBy="types")
     */
    private $questions;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->addType($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            $question->removeType($this);
        }

        return $this;
    }

}
